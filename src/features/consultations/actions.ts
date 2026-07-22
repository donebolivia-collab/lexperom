"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ConsultationStatus } from "@/types/database";

async function requireStaffUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado.");
  return { supabase, userId: user.id };
}

export async function updateConsultationStatus(
  consultationId: string,
  status: ConsultationStatus
) {
  const { supabase, userId } = await requireStaffUser();

  const { data: current } = await supabase
    .from("consultations")
    .select("status")
    .eq("id", consultationId)
    .single();

  const { error } = await supabase
    .from("consultations")
    .update({ status })
    .eq("id", consultationId);

  if (error) throw new Error("No se pudo actualizar el estado.");

  await supabase.from("audit_logs").insert({
    actor_id: userId,
    entity_type: "consultation",
    entity_id: consultationId,
    action: "status_changed",
    metadata: { from: current?.status ?? null, to: status },
  });

  revalidatePath(`/admin/consultas/${consultationId}`);
  revalidatePath("/admin/consultas");
}

export async function confirmLegalArea(consultationId: string, legalArea: string) {
  const { supabase, userId } = await requireStaffUser();

  const { error } = await supabase
    .from("consultations")
    .update({ legal_area: legalArea, legal_area_confirmed: true })
    .eq("id", consultationId);

  if (error) throw new Error("No se pudo confirmar la materia.");

  await supabase.from("audit_logs").insert({
    actor_id: userId,
    entity_type: "consultation",
    entity_id: consultationId,
    action: "legal_area_confirmed",
    metadata: { legal_area: legalArea },
  });

  revalidatePath(`/admin/consultas/${consultationId}`);
}

export async function addNote(consultationId: string, body: string) {
  if (!body.trim()) return;
  const { supabase, userId } = await requireStaffUser();

  const { error } = await supabase.from("notes").insert({
    consultation_id: consultationId,
    author_id: userId,
    body: body.trim(),
  });

  if (error) throw new Error("No se pudo guardar la nota.");

  await supabase.from("audit_logs").insert({
    actor_id: userId,
    entity_type: "consultation",
    entity_id: consultationId,
    action: "note_added",
    metadata: null,
  });

  revalidatePath(`/admin/consultas/${consultationId}`);
}
