import type { ContactMethodValue } from "@/validators/consultation";

/** Resultado devuelto por el Server Action de envío de consulta. */
export type SubmitConsultationResult =
  | {
      ok: true;
      publicCode: string;
      createdAt: string;
      contactMethod: ContactMethodValue;
      documentsReceived: number;
    }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<string, string>>;
    };

/** Forma persistida localmente para recuperar el relato ante recarga/error. */
export interface IntakeDraft {
  narrative: string;
  contactMethod: ContactMethodValue | "";
  fullName: string;
  phone: string;
  email: string;
  savedAt: number;
}

export const INTAKE_DRAFT_STORAGE_KEY = "legal-intake-draft:v1";
