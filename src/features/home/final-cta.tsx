import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="bg-brand">
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-brand-foreground sm:text-3xl">
          Cuéntanos tu problema
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-brand-foreground/80">
          Escribe tu situación con tus propias palabras. Nosotros nos encargamos de
          organizarla para revisión profesional.
        </p>
        <Link
          href="#consulta"
          className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-7 bg-surface")}
        >
          Empezar ahora
        </Link>
      </div>
    </section>
  );
}
