import { LegalIntakeForm } from "@/features/intake/legal-intake-form";

export function Hero() {
  return (
    <section id="consulta" className="mx-auto max-w-3xl px-4 pb-16 pt-4 sm:px-6 sm:pt-5">
      <div className="mb-3 text-center sm:mb-4">
        <h1 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          ¿Necesitas orientación legal? Cuéntanos tu caso.
        </h1>
        <p className="mx-auto mt-1.5 max-w-xl text-sm leading-relaxed text-ink">
          Envíanos tu consulta. Recibirás orientación legal personalizada.
        </p>
      </div>

      <LegalIntakeForm />
    </section>
  );
}
