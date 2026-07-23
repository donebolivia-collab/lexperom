import Link from "next/link";
import { siteConfig } from "@/config/site";

// Calcado del estilo de navbar de Lidiare: enlaces de texto puro (sin
// botón/borde), dos líneas en mayúsculas, primera línea suave y segunda
// en negrita — adaptado a nuestro header azul con texto blanco (ellos
// usan gris/negro sobre blanco).
const NAV_ITEM = "flex flex-col items-start text-left uppercase leading-tight tracking-wide";

export function SiteHeader() {
  return (
    // Bloque superior sólido en el azul de marca (el mismo --color-brand
    // que usa el resto del sitio), texto blanco para contraste.
    <header className="sticky top-0 z-40 bg-brand">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          {siteConfig.logo.wordmarkText}
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          <Link href="/soluciones-legales" className={NAV_ITEM}>
            <span className="text-sm font-normal text-white/70">Soluciones</span>
            <span className="text-sm font-bold text-white">Legales</span>
          </Link>
          <Link href="/planes" className={NAV_ITEM}>
            <span className="text-sm font-normal text-white/70">Nuestros</span>
            <span className="text-sm font-bold text-white">Planes</span>
          </Link>
          <Link href="/canales-contacto" className={NAV_ITEM}>
            <span className="text-sm font-normal text-white/70">Canales</span>
            <span className="text-sm font-bold text-white">de Contacto</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
