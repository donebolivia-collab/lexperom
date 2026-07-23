import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    // Bloque superior sólido en el azul de marca (el mismo --color-brand
    // que usa el resto del sitio), texto blanco para contraste.
    <header className="sticky top-0 z-40 bg-brand">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          {siteConfig.logo.wordmarkText}
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/90 sm:flex">
          <Link href="/como-funciona" className="hover:text-white">
            Cómo funciona
          </Link>
          <Link href="/planes" className="hover:text-white">
            Planes
          </Link>
          <Link href="/profesional" className="hover:text-white">
            Profesional
          </Link>
          <Link href="/privacidad" className="hover:text-white">
            Privacidad
          </Link>
        </nav>

        <Link
          href="/canales-contacto"
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "bg-white text-brand hover:bg-white/90"
          )}
        >
          Contacto
        </Link>
      </div>
    </header>
  );
}
