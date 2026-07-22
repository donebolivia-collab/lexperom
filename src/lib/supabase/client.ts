"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para Client Components. Usa la anon key (pública por
 * diseño) — la seguridad real vive en RLS y en que el rol "anon" no tiene
 * ninguna policy de lectura/escritura sobre datos sensibles.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
