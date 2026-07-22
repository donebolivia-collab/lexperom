import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Términos de Uso — ${siteConfig.siteName}`,
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Términos de Uso</h1>

      <div className="mt-4 rounded-lg border border-line bg-paper px-4 py-3 text-sm text-muted">
        [PENDIENTE DE REVISIÓN LEGAL] Este texto es una plantilla de trabajo y debe ser
        revisado y adaptado por el profesional responsable antes de publicarse en producción.
      </div>

      <div className="mt-8 max-w-none space-y-6 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="text-base font-semibold text-ink">1. Naturaleza del servicio</h2>
          <p>
            Este sitio permite enviar una consulta jurídica describiendo tu situación con tus
            propias palabras, para que sea revisada por un profesional. No es un servicio de
            asesoría legal automática ni sustituye la evaluación de un abogado.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-ink">2. No se crea relación abogado-cliente</h2>
          <p>
            El envío de una consulta a través de este sitio no crea automáticamente una
            relación abogado-cliente ni garantiza la aceptación del caso. Dicha relación solo
            se establece mediante acuerdo expreso posterior.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-ink">3. Uso de herramientas tecnológicas</h2>
          <p>
            Para organizar y analizar preliminarmente la información recibida, este sitio
            utiliza herramientas de inteligencia artificial. Dicho análisis es únicamente un
            apoyo interno de organización; toda evaluación jurídica final es responsabilidad
            de un profesional humano.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-ink">4. Veracidad de la información</h2>
          <p>
            Al enviar tu consulta declaras que la información proporcionada es verídica y de
            buena fe.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-ink">5. Contacto</h2>
          <p>Para consultas sobre estos términos: {siteConfig.contact.email}</p>
        </section>
      </div>
    </article>
  );
}
