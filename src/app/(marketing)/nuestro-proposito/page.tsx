import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { LexperomShield } from "@/components/brand/lexperom-shield";

export const metadata: Metadata = {
  title: `Nuestro Equipo — ${siteConfig.siteName}`,
  description:
    "De dónde viene el nombre Lexperom, cómo trabajamos y el Cupo Social que sostiene nuestra función social en Bolivia.",
};

const EQUIPO_PARAGRAPHS = [
  "En Lexperom combinamos el conocimiento jurídico tradicional con herramientas digitales de vanguardia para dar soluciones legales reales y accesibles. Rompemos los modelos tradicionales de asesoría legal para ofrecer alternativas alineadas con las nuevas tecnologías, sin dejar de lado la seriedad y el criterio profesional que cualquier caso merece.",
];

const MODELO_PARAGRAPHS = [
  "Cobramos por planes de protección legal, y ese ingreso es justamente lo que nos permite seguir aquí, mejorar y llegar a más personas cada mes. Pero no queremos que la capacidad de pagar decida quién accede a la justicia.",
  "Tu primera consulta siempre es gratuita.",
  "Cuando un caso necesita más que una orientación inicial, ahí entra el Cupo Social Lexperom. Cada mes garantizamos al menos un cupo, y ese número crece con nosotros. Por cada 20 membresías activas ese mes, se suma uno más. Entre más personas confían en Lexperom, más personas podemos ayudar.",
  "Antes de asignar un cupo, evaluamos el caso con la misma seriedad que cualquier otro. De ahí sale si corresponde una tarifa social o si queda completamente gratuito, según la situación de cada persona. Y si ya se llenó el cupo del mes, te lo decimos tal cual, y quedas primero en la fila para el siguiente mes.",
];

export default function NuestroPropositoPage() {
  return (
    <div>
      {/* Héroe oscuro */}
      <section className="relative overflow-hidden bg-brand-strong">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Lex, perfugium omnibus
            </h1>
            <p className="mt-6 text-justify text-sm leading-relaxed text-white/80 sm:text-base">
              Lexperom nace bajo la inspiración del latín <em className="italic">Lex, perfugium
              omnibus</em>, que se traduce como «la ley, refugio para todos», un principio que
              define nuestra razón de ser. Asumimos el compromiso firme de convertir el derecho en
              un espacio verdaderamente accesible, transparente y protector. Creemos que la
              justicia no debe ser un privilegio reservado únicamente para quienes conocen las
              reglas del sistema; por eso, brindamos un trato cálido y humano, entendiendo a fondo
              las necesidades de cada persona para acompañarla y encontrar la solución exacta que
              su caso requiere.
            </p>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
              <Image
                src="/images/nuestro-proposito/hero-proteccion.jpg"
                alt="Abogado sosteniendo un ícono de protección legal"
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-xl bg-ink/90 px-5 py-4 shadow-xl backdrop-blur sm:-left-8">
              <LexperomShield className="h-9 w-9 shrink-0 text-white" />
              <div>
                <p className="text-sm font-semibold leading-tight text-white">
                  Primera consulta
                </p>
                <p className="text-sm font-semibold leading-tight text-white">
                  siempre gratuita
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro equipo */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/nuestro-proposito/equipo-manos.jpg"
              alt="Equipo de Lexperom trabajando en conjunto"
              fill
              sizes="(min-width: 1024px) 42vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Nuestro equipo
            </h2>
            <div className="mt-5 space-y-4">
              {EQUIPO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-ink sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Un modelo con función social */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Un modelo con función social
            </h2>
            <div className="mt-5 space-y-4">
              {MODELO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-ink sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg lg:order-2">
            <Image
              src="/images/nuestro-proposito/cupo-social-persona.jpg"
              alt="Protección legal representada como una persona resguardada"
              fill
              sizes="(min-width: 1024px) 42vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
