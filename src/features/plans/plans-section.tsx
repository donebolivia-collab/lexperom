import Link from "next/link";
import { Check } from "lucide-react";
import { legalPlans } from "@/config/plans";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlansSectionProps {
  showFaq?: boolean;
}

export function PlansSection({ showFaq = true }: PlansSectionProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Planes de protección legal
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
          Una membresía mensual para tener a un abogado disponible antes de que un problema
          legal se te complique — no es un seguro, es acceso directo a servicios legales.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {legalPlans.map((plan) => (
          <Card
            key={plan.id}
            className={cn("flex flex-col", plan.highlight && "border-2 border-brand shadow-md")}
          >
            <CardContent className="flex flex-1 flex-col p-6">
              {plan.highlight && (
                <Badge variant="brand" className="mb-3 w-fit">
                  Más elegido
                </Badge>
              )}
              <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{plan.tagline}</p>

              <p className="mt-4">
                <span className="text-3xl font-semibold tracking-tight text-ink">
                  Bs {plan.priceBs}
                </span>
                <span className="text-sm text-muted"> /mes</span>
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/#consulta"
                className={cn(
                  buttonVariants({ variant: plan.highlight ? "primary" : "secondary" }),
                  "mt-6 w-full"
                )}
              >
                Quiero este plan
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {showFaq && (
        <div className="mx-auto mt-12 max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
          <p>
            <strong className="font-medium text-ink-soft">¿Esto es un seguro?</strong> No. Es
            una membresía de acceso directo a servicios legales — como una revisión médica
            preventiva, pero para tus temas legales. No sustituye ni funciona como una póliza de
            seguro.
          </p>
          <p>
            <strong className="font-medium text-ink-soft">¿Qué no incluye?</strong> Tasas,
            aranceles, notariado, peritajes y otros costos de terceros no están incluidos en
            ningún plan — solo el acceso a la asesoría, revisión y acompañamiento del equipo
            legal.
          </p>
          <p>
            Por ahora, para activar tu membresía, cuéntanos qué plan te interesa a través del
            formulario de consulta y coordinamos contigo directamente.
          </p>
        </div>
      )}
    </div>
  );
}
