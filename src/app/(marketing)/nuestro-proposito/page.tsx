import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { LexperomShield } from "@/components/brand/lexperom-shield";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Nuestro Equipo — ${siteConfig.siteName}`,
  description:
    "De dónde viene el nombre Lexperom, cómo trabajamos y el Cupo Social que sostiene nuestra función social en Bolivia.",
};

const EQUIPO_PARAGRAPHS = [
  "En Lexperom combinamos el conocimiento jurídico tradicional con herramientas digitales de vanguardia para dar soluciones legales reales y accesibles. Rompemos los modelos tradicionales de asesoría legal para ofrecer alternativas alineadas con las nuevas tecnologías, sin dejar de lado la seriedad y el criterio profesional que cualquier caso merece.",
  "Tenemos oficina física, y puedes contactarnos también por llamada, WhatsApp, correo electrónico, Telegram o nuestra página web, el canal que te resulte más cómodo. Apenas nos escribes, tu caso llega ya ordenado a manos del abogado que te va a atender, así no tienes que repetir tu historia dos veces ni esperar que alguien más lo derive.",
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Nuestro Equipo
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Lex perfugium omnibus
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-white/80 sm:text-base">
              El nombre Lexperom viene de esa frase en latín, que se traduce como &ldquo;la ley,
              refugio para todos&rdquo;. Tomamos LEX de Lex (la ley), PER de Perfugium (refugio) y
              OM de Omnibus (para todos), y las unimos en un solo nombre porque resume lo que
              queremos ser: un lugar al que cualquier persona pueda llegar cuando el derecho la
              protege, sin importar cuánto sabe, a quién conoce o dónde nació. Para nosotros la
              justicia es un derecho de todos, no el resultado de tener los contactos correctos o
              saber moverte dentro de un sistema que a veces parece hecho para que solo unos pocos
              lo entiendan. Ese principio guía cada decisión que tomamos en Lexperom.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#consulta" className={buttonVariants({ variant: "primary", size: "lg" })}>
                Cuéntanos tu caso
              </Link>
              <Link
                href="/planes"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "border-white/20 bg-white/5 text-white hover:bg-white/10"
                )}
              >
                Ver planes
              </Link>
            </div>
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Cómo trabajamos
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
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

      {/* El problema: bloque plano, sin imagen, para el contraste */}
      <section className="bg-black/[0.03]">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            El problema
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-ink sm:text-base">
            Mucha gente en Bolivia convive con un problema legal sin buscar ayuda. No porque no
            exista una solución, sino porque no sabe cuánto le va a costar, teme que un abogado la
            complique más, o simplemente no sabe por dónde empezar. El resultado es siempre el
            mismo: se queda callada y acepta algo injusto.
          </p>
          <p className="mt-4 text-base font-semibold leading-relaxed text-ink sm:text-lg">
            Ese silencio es el problema que queremos resolver.
          </p>
        </div>
      </section>

      {/* Un modelo con función social */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Cupo Social Lexperom
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
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
