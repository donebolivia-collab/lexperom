import Link from "next/link";
import { siteConfig } from "@/config/site";

// Botones tipo píldora de dos líneas naturales (frase de dos palabras que
// se parte en su punto natural), inspirados en el estilo de navbar de
// Lidiare — no una palabra corta forzada a partirse.
const NAV_BUTTON =
  "flex flex-col items-center justify-center rounded-lg border border-white/25 px-3.5 py-1.5 text-center text-xs font-medium leading-tight text-white transition-colors hover:bg-white/10";

export function SiteHeader() {
  return (
    // Bloque superior sólido en el azul de marca (el mismo --color-brand
    // que usa el resto del sitio), texto blanco para contraste.
    <header className="sticky top-0 z-40 bg-brand">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          {siteConfig.logo.wordmarkText}
        </Link>

        <nav className="hidden items-center gap-3 sm:flex">
          <Link href="/planes" className={NAV_BUTTON}>
            <span>Nuestros</span>
            <span>Planes</span>
          </Link>
          <Link href="/canales-contacto" className={NAV_BUTTON}>
            <span>Canales</span>
            <span>de Contacto</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
