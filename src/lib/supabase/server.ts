import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cliente Supabase para Server Components / Server Actions, atado a la
 * sesión del usuario autenticado (equipo del despacho) vía cookies. Respeta
 * RLS — no usar para el intake público, que debe pasar por el cliente admin.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Se llamó desde un Server Component sin poder escribir cookies;
            // el proxy (proxy.ts) se encarga de refrescar la sesión.
          }
        },
      },
    }
  );
}
