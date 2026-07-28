import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { siteConfig } from "@/config/site";
import { legalAreas } from "@/config/legal-areas";
import { buttonVariants } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getArea(slug: string) {
  return legalAreas.find((area) => area.slug === slug);
}

export function generateStaticParams() {
  return legalAreas
    .filter((area) => area.slug)
    .map((area) => ({ slug: area.slug as string }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};

  return {
    title: `${area.name} — ${siteConfig.siteName}`,
    description: area.longDescription ?? area.description,
  };
}

export default async function ServicioDetallePage({ params }: PageProps) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const Icon = area.icon;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/servicios"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-brand"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Nuestros Servicios
      </Link>

      <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
        <Icon className="h-7 w-7 text-brand" aria-hidden="true" />
      </div>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {area.name}
      </h1>

      {area.longDescription && (
        <p className="mt-4 text-justify text-sm leading-relaxed text-ink sm:text-base">
          {area.longDescription}
        </p>
      )}

      {area.commonSituations && area.commonSituations.length > 0 && (
        <div className="mt-10">
          <h2 className="text-base font-semibold text-ink">Situaciones comunes en esta área</h2>
          <ul className="mt-4 space-y-3">
            {area.commonSituations.map((situation) => (
              <li key={situation} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-ink sm:text-base">{situation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-12 rounded-xl border border-line bg-black/[0.02] p-6 text-center">
        <p className="text-sm leading-relaxed text-ink sm:text-base">
          No necesitas encajar exactamente en esta descripción — cuéntanos tu situación con tus
          propias palabras y nosotros la revisamos.
        </p>
        <Link
          href="/#consulta"
          className={buttonVariants({ variant: "primary", size: "lg" }) + " mt-5 gap-2"}
        >
          Cuéntanos tu caso
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
