import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Sobre Nosotros — ${siteConfig.siteName}`,
  description:
    "De dónde viene el nombre Lexperom, cómo trabajamos y el Cupo Social que sostiene nuestra función social en Bolivia.",
};

const EQUIPO_PARAGRAPHS = [
  "En Lexperom combinamos el conocimiento jurídico tradicional con herramientas digitales de vanguardia para dar soluciones legales reales y accesibles. Rompemos los modelos tradicionales de asesoría legal para ofrecer alternativas alineadas con las nuevas tecnologías, sin dejar de lado la seriedad y el criterio profesional que cualquier caso merece.",
];

const MODELO_INTRO =
  "Cobramos por planes de protección legal, y ese ingreso es justamente lo que nos permite seguir aquí, mejorar y llegar a más personas cada mes. Pero no queremos que la capacidad de pagar decida quién accede a la justicia.";

export default function NuestroPropositoPage() {
  return (
    <div>
      {/* Héroe */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Nuestro compromiso
            </h1>
            <p className="mt-6 text-justify text-sm leading-relaxed text-ink sm:text-base">
              Lexperom nace bajo la inspiración del latín <em className="italic">Lex, perfugium
              omnibus</em>, que se traduce como «la ley, refugio para todos», un principio que
              define nuestra razón de ser. Asumimos el compromiso firme de convertir el derecho en
              un espacio verdaderamente accesible, transparente y protector. Creemos que la
              justicia no debe ser un privilegio reservado únicamente para quienes conocen las
              reglas del sistema, por eso, brindamos un trato humano, entendiendo a fondo las
              necesidades de cada persona para acompañarla y encontrar la solución legal que su
              caso requiere. La primera consulta en Lexperom siempre es gratuita.
            </p>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-line">
              <Image
                src="/images/nuestro-proposito/hero-proteccion.jpg"
                alt="Abogado sosteniendo un ícono de protección legal"
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro equipo */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
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
                <p
                  key={paragraph}
                  className="text-justify text-sm leading-relaxed text-ink sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Un modelo con función social */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-0 sm:px-6 sm:pb-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Nuestro Compromiso Social
            </h2>
            <div className="mt-5 space-y-4">
              <p className="text-justify text-sm leading-relaxed text-ink sm:text-base">
                {MODELO_INTRO}
              </p>
              <p className="text-justify text-sm leading-relaxed text-ink sm:text-base">
                Cuando un caso requiere ir más allá de la orientación inicial y detectamos que la
                persona o familia se encuentra en una situación de vulnerabilidad sin la
                posibilidad de pagar las diligencias posteriores, entra en juego nuestro{" "}
                <strong className="font-semibold text-brand">Cupo Social Lexperom</strong>.
                Garantizamos al menos un cupo cada mes, pero ese número crece a la par con
                nosotros, por cada 20 membresías activas, sumamos un cupo adicional. Así de
                simple, cuantas más personas confían en Lexperom, a más personas que realmente lo
                necesitan podemos brindar amparo y protección.
              </p>
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
