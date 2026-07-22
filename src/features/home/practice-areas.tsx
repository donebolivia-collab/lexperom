import { siteConfig } from "@/config/site";

export function PracticeAreas() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
      <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        Áreas orientativas
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
        Si no sabes a qué área corresponde tu problema, simplemente cuéntanos qué ocurrió.
      </p>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {siteConfig.practiceAreas.map((area) => (
          <li
            key={area}
            className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft"
          >
            {area}
          </li>
        ))}
      </ul>
    </section>
  );
}
