import Image from "next/image";
import { User } from "lucide-react";
import { siteConfig } from "@/config/site";

function isPlaceholder(value: string): boolean {
  return !value || value.startsWith("[");
}

export function ProfessionalProfile() {
  const { professional } = siteConfig;
  const hasPhoto = !isPlaceholder(professional.photoUrl);

  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-paper ring-1 ring-line">
            {hasPhoto ? (
              <Image
                src={professional.photoUrl}
                alt={professional.name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-muted" aria-hidden="true" />
            )}
          </div>

          <div>
            <p className="text-base font-semibold text-ink">{professional.name}</p>
            <p className="text-sm text-muted">{professional.credentials}</p>
            <p className="text-sm text-muted">
              {professional.barNumber} · {professional.baseCity}
            </p>
          </div>

          <p className="max-w-lg text-sm leading-relaxed text-muted">
            Cada consulta es revisada profesionalmente. Utilizamos herramientas tecnológicas
            avanzadas para organizar y analizar información, manteniendo la evaluación jurídica
            bajo responsabilidad profesional.
          </p>
        </div>
      </div>
    </section>
  );
}
