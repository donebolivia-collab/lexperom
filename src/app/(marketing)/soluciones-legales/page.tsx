import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { legalAreas } from "@/config/legal-areas";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: `Soluciones legales — ${siteConfig.siteName}`,
  description:
    "Áreas legales orientativas en Bolivia: accidentes, seguros, penal, civil, familia, laboral y más. No necesitas identificar la categoría — cuéntanos qué ocurrió.",
};

export default function SolucionesLegalesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Soluciones legales
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
          Estas son solo orientativas — no necesitas identificar la categoría exacta de tu
          problema. Cuéntanos qué ocurrió con tus propias palabras y nosotros lo organizamos
          para revisión profesional.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {legalAreas.map((area) => {
          const Icon = area.icon;
          return (
            <Card key={area.name} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10">
                  <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-base font-semibold text-ink">{area.name}</h2>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
                  {area.description}
                </p>
                <Link
                  href="/#consulta"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                >
                  Cuéntanos tu caso
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-muted">
        Todas estas categorías llevan al mismo lugar: nuestro formulario de consulta. No hace
        falta elegir una antes de escribir — solo cuéntanos qué pasó.
      </p>
    </div>
  );
}
