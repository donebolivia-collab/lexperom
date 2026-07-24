"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { LexperomLogo } from "@/components/brand/lexperom-logo";

// Calcado del estilo de navbar de Lidiare: enlaces de texto puro (sin
// botón/borde), dos líneas en mayúsculas, primera línea suave y segunda
// en negrita — adaptado a nuestro header azul con texto blanco (ellos
// usan gris/negro sobre blanco).
const NAV_ITEM = "flex flex-col items-start text-left uppercase leading-tight tracking-wide";

const NAV_LINKS = [
  { href: "/soluciones-legales", top: "Soluciones", bottom: "Legales" },
  { href: "/planes", top: "Nuestros", bottom: "Planes" },
  { href: "/canales-contacto", top: "Canales", bottom: "de Contacto" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-brand">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <LexperomLogo />
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={NAV_ITEM}>
              <span className="text-sm font-normal text-white/70">{link.top}</span>
              <span className="text-sm font-bold text-white">{link.bottom}</span>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="text-white sm:hidden"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Menú móvil: pantalla completa, mismo azul de marca. */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-brand sm:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <LexperomLogo />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="text-white"
              aria-label="Cerrar menú"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-start justify-center gap-8 px-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="uppercase leading-tight tracking-wide"
              >
                <span className="block text-base font-normal text-white/70">{link.top}</span>
                <span className="block text-2xl font-bold text-white">{link.bottom}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
