"use server";

import { headers } from "next/headers";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { generatePublicCode } from "@/lib/public-code";
import { sanitizeFilename } from "@/lib/sanitize-filename";
import { runPreliminaryAnalysis } from "@/lib/ai";
import {
  consultationIntakeSchema,
  isAllowedDocumentType,
  MAX_FILES,
  MAX_FILE_SIZE_BYTES,
} from "@/validators/consultation";
import type { SubmitConsultationResult } from "@/types/intake";

const CONSENT_TEXT_VERSION = "2026-07-v1";
const GENERIC_ERROR =
  "No pudimos enviar tu consulta. Tu información no se ha perdido. Intenta nuevamente.";

function getClientIp(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headerList.get("x-real-ip") ?? "unknown";
}

export async function submitConsultation(
  formData: FormData
): Promise<SubmitConsultationResult> {
  const headerList = await headers();
  const ip = getClientIp(headerList);

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return {
      ok: false,
      error:
        "Recibimos demasiadas solicitudes desde tu conexión. Intenta nuevamente en unos minutos.",
    };
  }

  const idempotencyKey = String(formData.get("idempotencyKey") ?? "").slice(0, 100);

  // Todo lo que sigue depende de infraestructura externa (Supabase, IA) que
  // puede fallar por configuración faltante o cortes de red. Nunca debe
  // hacer explotar la Server Action: el usuario siempre debe recibir el
  // mensaje genérico de reintento en vez de una pantalla de error en blanco,
  // y su relato nunca se pierde porque queda autoguardado en el navegador.
  let admin: ReturnType<typeof createSupabaseAdminClient>;
  try {
    admin = createSupabaseAdminClient();
  } catch (error) {
    console.error("createSupabaseAdminClient failed", error);
    return { ok: false, error: GENERIC_ERROR };
  }

  // Idempotencia: si ya existe una consulta con esta clave (doble clic, retry
  // de red), devolver el mismo resultado en vez de duplicar.
  if (idempotencyKey) {
    try {
      const { data: existing } = await admin
        .from("consultations")
        .select("public_code, created_at, contact_id, documents(count)")
        .eq("idempotency_key", idempotencyKey)
        .maybeSingle();

      if (existing) {
        const { data: contact } = await admin
          .from("contacts")
          .select("preferred_method")
          .eq("id", existing.contact_id)
          .single();

        return {
          ok: true,
          publicCode: existing.public_code,
          createdAt: existing.created_at,
          contactMethod: contact?.preferred_method ?? "whatsapp",
          documentsReceived: existing.documents?.[0]?.count ?? 0,
        };
      }
    } catch (error) {
      console.error("idempotency check failed", error);
      return { ok: false, error: GENERIC_ERROR };
    }
  }

  const rawFields = {
    narrative: String(formData.get("narrative") ?? ""),
    contactMethod: String(formData.get("contactMethod") ?? ""),
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    consent: formData.get("consent") === "true",
    website: String(formData.get("website") ?? ""),
  };

  const parsed = consultationIntakeSchema.safeParse(rawFields);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Revisa los datos del formulario.", fieldErrors };
  }

  // Honeypot: los bots suelen rellenar todos los campos, incluido este,
  // oculto para humanos. Si llega con contenido, se descarta en silencio.
  if (parsed.data.website) {
    return { ok: false, error: GENERIC_ERROR };
  }

  const files = formData
    .getAll("documents")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (files.length > MAX_FILES) {
    return {
      ok: false,
      error: `Puedes adjuntar hasta ${MAX_FILES} archivos.`,
    };
  }

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return { ok: false, error: `El archivo "${file.name}" supera el tamaño máximo permitido.` };
    }
    if (!isAllowedDocumentType(file.type)) {
      return {
        ok: false,
        error: `El archivo "${file.name}" tiene un formato no permitido.`,
      };
    }
  }

  const data = parsed.data;

  try {
    const { data: contact, error: contactError } = await admin
      .from("contacts")
      .insert({
        full_name: data.fullName || null,
        phone: data.phone || null,
        email: data.email || null,
        preferred_method: data.contactMethod,
      })
      .select("id")
      .single();

    if (contactError || !contact) throw contactError ?? new Error("No se pudo crear el contacto");

    let publicCode = generatePublicCode();
    let consultation: { id: string; public_code: string; created_at: string } | null = null;

    // El código público es único; en la práctica una colisión es
    // extremadamente rara, pero reintentamos unas pocas veces por seguridad.
    for (let attempt = 0; attempt < 5 && !consultation; attempt++) {
      const { data: inserted, error } = await admin
        .from("consultations")
        .insert({
          public_code: publicCode,
          contact_id: contact.id,
          narrative: data.narrative,
          idempotency_key: idempotencyKey || null,
        })
        .select("id, public_code, created_at")
        .single();

      if (!error && inserted) {
        consultation = inserted;
      } else if (error?.code === "23505") {
        publicCode = generatePublicCode();
      } else if (error) {
        throw error;
      }
    }

    if (!consultation) throw new Error("No se pudo generar un código único para la consulta.");

    await admin.from("consent_records").insert({
      consultation_id: consultation.id,
      consented: true,
      consent_text_version: CONSENT_TEXT_VERSION,
      ip_address: ip,
      user_agent: headerList.get("user-agent") ?? null,
    });

    const utm = {
      utm_source: String(formData.get("utm_source") ?? "") || null,
      utm_medium: String(formData.get("utm_medium") ?? "") || null,
      utm_campaign: String(formData.get("utm_campaign") ?? "") || null,
      utm_content: String(formData.get("utm_content") ?? "") || null,
      utm_term: String(formData.get("utm_term") ?? "") || null,
      referrer: String(formData.get("referrer") ?? "") || null,
      landing_page: String(formData.get("landing_page") ?? "") || null,
    };
    if (Object.values(utm).some(Boolean)) {
      await admin
        .from("marketing_attribution")
        .insert({ consultation_id: consultation.id, ...utm });
    }

    let documentsReceived = 0;
    for (const file of files) {
      const safeName = sanitizeFilename(file.name);
      const storagePath = `${consultation.id}/${crypto.randomUUID()}-${safeName}`;
      const bytes = new Uint8Array(await file.arrayBuffer());

      const { error: uploadError } = await admin.storage
        .from("consultation-documents")
        .upload(storagePath, bytes, { contentType: file.type, upsert: false });

      if (uploadError) continue; // no perder toda la consulta por un archivo

      await admin.from("documents").insert({
        consultation_id: consultation.id,
        storage_path: storagePath,
        original_filename: file.name.slice(0, 200),
        mime_type: file.type,
        size_bytes: file.size,
      });
      documentsReceived += 1;
    }

    await admin.from("audit_logs").insert({
      entity_type: "consultation",
      entity_id: consultation.id,
      action: "created",
      metadata: { source: "public_intake", documents: documentsReceived },
    });

    // Análisis preliminar por IA: best-effort, nunca debe hacer fallar el
    // envío si el proveedor falla o no está configurado. Se espera (await)
    // porque en despliegues serverless (Vercel) el proceso puede congelarse
    // apenas se devuelve la respuesta, y un "fire and forget" real no
    // llegaría a ejecutarse. En Fase 2 esto puede moverse a una cola.
    await runAnalysisInBackground(consultation.id, data.narrative, admin);

    return {
      ok: true,
      publicCode: consultation.public_code,
      createdAt: consultation.created_at,
      contactMethod: data.contactMethod,
      documentsReceived,
    };
  } catch (error) {
    console.error("submitConsultation failed", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

async function runAnalysisInBackground(
  consultationId: string,
  narrative: string,
  admin: ReturnType<typeof createSupabaseAdminClient>
) {
  try {
    const outcome = await runPreliminaryAnalysis(narrative);

    await admin.from("ai_analyses").insert({
      consultation_id: consultationId,
      provider: outcome.provider,
      model: outcome.model,
      prompt_version: outcome.promptVersion,
      summary: outcome.result.summary,
      possible_areas: outcome.result.possibleAreas,
      urgency_suggestion: outcome.result.urgency,
      entities: {
        people: outcome.result.peopleMentioned,
        institutions: outcome.result.institutionsMentioned,
        dates: outcome.result.datesMentioned,
        places: outcome.result.placesMentioned,
        amounts: outcome.result.amountsMentioned,
      },
      missing_information: outcome.result.missingInformation,
      suggested_questions: outcome.result.suggestedQuestions,
      red_flags: outcome.result.redFlags,
      raw_output: outcome.raw as never,
    });

    await admin
      .from("consultations")
      .update({ urgency: outcome.result.urgency, urgency_source: "ia" })
      .eq("id", consultationId);
  } catch (error) {
    console.error("runPreliminaryAnalysis failed", error);
  }
}
