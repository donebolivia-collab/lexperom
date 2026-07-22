import { z } from "zod";

/**
 * Reglas de validación del intake público. Se ejecutan en cliente (UX) y
 * de nuevo en servidor (autoridad final) dentro del Server Action — nunca
 * confiar solo en la validación del navegador.
 */

export const CONTACT_METHODS = ["whatsapp", "llamada", "email"] as const;
export type ContactMethodValue = (typeof CONTACT_METHODS)[number];

export const NARRATIVE_MIN_LENGTH = 20;
export const NARRATIVE_MAX_LENGTH = 8000;

export const MAX_FILES = 6;
export const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB
export const ALLOWED_DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
] as const;

export const consultationIntakeSchema = z
  .object({
    narrative: z
      .string()
      .trim()
      .min(
        NARRATIVE_MIN_LENGTH,
        "Cuéntanos un poco más sobre lo que ocurrió para poder ayudarte."
      )
      .max(NARRATIVE_MAX_LENGTH, "El relato es muy extenso. Resume un poco."),
    contactMethod: z.enum(CONTACT_METHODS),
    fullName: z.string().trim().max(120).optional().or(z.literal("")),
    phone: z.string().trim().max(30).optional().or(z.literal("")),
    email: z.email().optional().or(z.literal("")),
    consent: z.literal(true, {
      error: "Debes aceptar la Política de Privacidad para continuar.",
    }),
    // Honeypot anti-spam: debe llegar vacío. Los bots suelen rellenar todos
    // los campos, incluido este, que está oculto para humanos por CSS.
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (
      (data.contactMethod === "whatsapp" || data.contactMethod === "llamada") &&
      !data.phone
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Ingresa un número de celular para contactarte.",
      });
    }
    if (data.contactMethod === "email" && !data.email) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Ingresa un correo electrónico para contactarte.",
      });
    }
  });

export type ConsultationIntakeInput = z.infer<typeof consultationIntakeSchema>;

export function isAllowedDocumentType(mimeType: string): boolean {
  return (ALLOWED_DOCUMENT_MIME_TYPES as readonly string[]).includes(mimeType);
}
