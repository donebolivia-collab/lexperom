import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase con service role key. IGNORA RLS por completo.
 *
 * Uso exclusivo: escribir el intake público (consultations, contacts,
 * documents, consent_records, marketing_attribution) desde Server Actions,
 * y tareas internas de sistema (ai_analyses, audit_logs). Nunca importar
 * este módulo desde un Client Component ni exponer la key al navegador.
 */
export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
