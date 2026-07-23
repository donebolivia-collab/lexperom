import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Reemplaza la protección que antes hacía proxy.ts. Se movió a los layouts
 * porque Next.js 16 obliga a Proxy a correr en runtime Node.js sin
 * posibilidad de cambiarlo a Edge, y Cloudflare Workers (vía OpenNext)
 * todavía no soporta Proxy/Middleware en Node.js. Un guard a nivel de
 * layout funciona igual en Vercel y en Cloudflare.
 */
export async function requireUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return user;
}
