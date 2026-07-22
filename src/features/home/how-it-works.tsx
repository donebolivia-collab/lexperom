const STEPS = [
  {
    number: "1",
    title: "Cuéntanos qué ocurrió",
    description: "Explícalo con tus propias palabras.",
  },
  {
    number: "2",
    title: "Revisamos tu información",
    description: "Analizamos la consulta y los documentos disponibles.",
  },
  {
    number: "3",
    title: "Te contactamos",
    description: "Nos comunicamos contigo para indicarte los siguientes pasos.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-center text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        Cómo funciona
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
        {STEPS.map((step) => (
          <div key={step.number}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground">
              {step.number}
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
