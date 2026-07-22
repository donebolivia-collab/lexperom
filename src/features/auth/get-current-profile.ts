import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

/** Perfil del usuario del equipo autenticado. Null si no hay fila en `profiles`. */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  return data as Profile | null;
}
