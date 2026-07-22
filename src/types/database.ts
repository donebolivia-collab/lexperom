/**
 * Tipos de dominio alineados con supabase/migrations/0001_init.sql.
 * Mantener sincronizado manualmente hasta introducir generación automática
 * (`supabase gen types typescript`) cuando el proyecto esté enlazado.
 */

export type UserRole = "admin" | "abogado" | "asistente" | "auditor";

export type ConsultationStatus =
  | "nueva"
  | "en_revision"
  | "requiere_informacion"
  | "contactar"
  | "contactado"
  | "consulta_agendada"
  | "propuesta_enviada"
  | "cliente"
  | "no_viable"
  | "archivada";

export type UrgencyLevel = "critico" | "alto" | "medio" | "bajo";

export type ContactMethod = "whatsapp" | "llamada" | "email";

export type LegalArea =
  | "penal"
  | "civil"
  | "familiar"
  | "laboral"
  | "administrativo"
  | "constitucional"
  | "comercial"
  | "seguros"
  | "accidentes"
  | "transito"
  | "responsabilidad_civil"
  | "deudas"
  | "contratos"
  | "sucesiones"
  | "propiedad"
  | "empresas"
  | "otros";

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

export interface Contact {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  preferred_method: ContactMethod;
  created_at: string;
}

export interface Consultation {
  id: string;
  public_code: string;
  contact_id: string;
  narrative: string;
  status: ConsultationStatus;
  urgency: UrgencyLevel | null;
  urgency_source: string | null;
  legal_area: LegalArea | null;
  legal_area_confirmed: boolean;
  assigned_to: string | null;
  idempotency_key: string | null;
  created_at: string;
  updated_at: string;
}

export interface ConsultationDocument {
  id: string;
  consultation_id: string;
  storage_path: string;
  original_filename: string;
  mime_type: string;
  size_bytes: number;
  uploaded_at: string;
}

export interface ConsentRecord {
  id: string;
  consultation_id: string;
  consented: boolean;
  consent_text_version: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface MarketingAttribution {
  id: string;
  consultation_id: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer: string | null;
  landing_page: string | null;
  created_at: string;
}

export interface AiAnalysis {
  id: string;
  consultation_id: string;
  provider: string;
  model: string;
  prompt_version: string;
  summary: string | null;
  possible_areas: string[] | null;
  urgency_suggestion: UrgencyLevel | null;
  entities: Record<string, unknown> | null;
  missing_information: string[] | null;
  suggested_questions: string[] | null;
  red_flags: string[] | null;
  raw_output: Record<string, unknown> | null;
  created_at: string;
}

export interface Note {
  id: string;
  consultation_id: string;
  author_id: string | null;
  body: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  entity_type: string;
  entity_id: string | null;
  action: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

/** Vista compuesta usada en el dashboard para listar/mostrar consultas. */
export interface ConsultationWithRelations extends Consultation {
  contact: Contact;
  documents: ConsultationDocument[];
  ai_analyses: AiAnalysis[];
  notes: Note[];
}
