import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">{siteConfig.logo.wordmarkText}</p>
            <p className="mt-1 max-w-xs text-sm text-muted">{siteConfig.tagline}</p>
          </div>

          <nav className="flex flex-col gap-2 text-sm text-ink-soft sm:items-end">
            <Link href="/planes" className="hover:text-ink">
              Planes
            </Link>
            <Link href="/privacidad" className="hover:text-ink">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-ink">
              Términos de Uso
            </Link>
            <Link href="/como-funciona" className="hover:text-ink">
              Cómo funciona
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-line pt-6 text-xs text-muted">
          <p>{siteConfig.professional.name} — {siteConfig.professional.credentials}</p>
          <p className="mt-1">
            {siteConfig.contact.city}, {siteConfig.contact.country} · {siteConfig.contact.email}
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
