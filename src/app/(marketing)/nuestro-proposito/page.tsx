import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Nuestro Propósito — ${siteConfig.siteName}`,
  description:
    "De dónde viene el nombre Lexperom, cómo trabajamos y el Cupo Social que sostiene nuestra función social en Bolivia.",
};

interface Section {
  heading: string;
  paragraphs: string[];
}

const SECTIONS: Section[] = [
  {
    heading: "Nuestro equipo",
    paragraphs: [
      "En Lexperom combinamos el conocimiento jurídico tradicional con herramientas digitales de vanguardia para dar soluciones legales reales y accesibles. Rompemos los modelos tradicionales de asesoría legal para ofrecer alternativas alineadas con las nuevas tecnologías, sin dejar de lado la seriedad y el criterio profesional que cualquier caso merece.",
      "Tenemos oficina física, y puedes contactarnos también por llamada, WhatsApp, correo electrónico, Telegram o nuestra página web, el canal que te resulte más cómodo. Apenas nos escribes, tu caso llega ya ordenado a manos del abogado que te va a atender, así no tienes que repetir tu historia dos veces ni esperar que alguien más lo derive.",
    ],
  },
  {
    heading: "El problema",
    paragraphs: [
      "Mucha gente en Bolivia convive con un problema legal sin buscar ayuda. No porque no exista una solución, sino porque no sabe cuánto le va a costar, teme que un abogado la complique más, o simplemente no sabe por dónde empezar. El resultado es siempre el mismo: se queda callada y acepta algo injusto.",
      "Ese silencio es el problema que queremos resolver.",
    ],
  },
  {
    heading: "Un modelo con función social",
    paragraphs: [
      "Cobramos por planes de protección legal, y ese ingreso es justamente lo que nos permite seguir aquí, mejorar y llegar a más personas cada mes. Pero no queremos que la capacidad de pagar decida quién accede a la justicia.",
      "Tu primera consulta siempre es gratuita.",
      "Cuando un caso necesita más que una orientación inicial, ahí entra el Cupo Social Lexperom. Cada mes garantizamos al menos un cupo, y ese número crece con nosotros. Por cada 20 membresías activas ese mes, se suma uno más. Entre más personas confían en Lexperom, más personas podemos ayudar.",
      "Antes de asignar un cupo, evaluamos el caso con la misma seriedad que cualquier otro. De ahí sale si corresponde una tarifa social o si queda completamente gratuito, según la situación de cada persona. Y si ya se llenó el cupo del mes, te lo decimos tal cual, y quedas primero en la fila para el siguiente mes.",
    ],
  },
];

export default function NuestroPropositoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Nuestro Propósito
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Lex perfugium omnibus
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-ink sm:text-base">
          El nombre Lexperom viene de esa frase en latín, que se traduce como &ldquo;la ley,
          refugio para todos&rdquo;. Tomamos LEX de Lex (la ley), PER de Perfugium (refugio) y OM
          de Omnibus (para todos), y las unimos en un solo nombre porque resume lo que queremos
          ser: un lugar al que cualquier persona pueda llegar cuando el derecho la protege, sin
          importar cuánto sabe, a quién conoce o dónde nació. Para nosotros la justicia es un
          derecho de todos, no el resultado de tener los contactos correctos o saber moverte
          dentro de un sistema que a veces parece hecho para que solo unos pocos lo entiendan. Ese
          principio guía cada decisión que tomamos en Lexperom.
        </p>
      </div>

      <div className="mt-16 space-y-14">
        {SECTIONS.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-ink sm:text-xl">{section.heading}</h2>
            <div className="mt-3 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-ink sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
