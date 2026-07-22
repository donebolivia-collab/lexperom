import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Política de Privacidad — ${siteConfig.siteName}`,
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Política de Privacidad</h1>

      <div className="mt-4 rounded-lg border border-line bg-paper px-4 py-3 text-sm text-muted">
        [PENDIENTE DE REVISIÓN LEGAL] Este texto es una plantilla de trabajo. Antes de publicar
        el sitio en producción debe ser revisado y adaptado por el profesional responsable
        conforme a la normativa boliviana vigente aplicable al tratamiento de datos personales.
      </div>

      <div className="prose prose-sm mt-8 max-w-none space-y-6 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="text-base font-semibold text-ink">1. Qué información recopilamos</h2>
          <p>
            Cuando envías una consulta a través de este sitio, recopilamos: el relato que
            escribes sobre tu situación, los documentos que decidas adjuntar, tu nombre (si lo
            proporcionas) y el medio de contacto que elijas (WhatsApp, teléfono o correo
            electrónico). También registramos datos técnicos básicos como el origen del
            tráfico (por ejemplo, si llegaste desde un anuncio) para entender qué canales son
            más útiles.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-ink">2. Para qué usamos tu información</h2>
          <p>
            Usamos tu información exclusivamente para evaluar tu consulta, contactarte por el
            medio que elegiste, y organizar internamente el seguimiento de tu caso si decides
            continuar. Parte del análisis inicial de tu relato puede ser asistido por
            herramientas de inteligencia artificial, pero toda evaluación jurídica final es
            responsabilidad de un profesional humano.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-ink">3. Con quién compartimos tu información</h2>
          <p>
            No vendemos ni compartimos tu información con terceros con fines comerciales. Tu
            información puede procesarse mediante proveedores de infraestructura técnica
            (hosting, base de datos y almacenamiento) que actúan bajo acuerdos de
            confidencialidad y no acceden a su contenido con fines propios.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-ink">4. Seguridad y confidencialidad</h2>
          <p>
            Tu información se almacena en infraestructura con acceso restringido, solo
            disponible para el equipo autorizado del despacho. Los documentos que adjuntas se
            guardan de forma privada y no son de acceso público.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-ink">5. Tus derechos</h2>
          <p>
            Puedes solicitar en cualquier momento acceso, corrección o eliminación de tu
            información, escribiendo a {siteConfig.contact.email}.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-ink">6. Retención de datos</h2>
          <p>
            Conservamos la información de tu consulta durante el tiempo necesario para
            evaluarla y, si corresponde, para el seguimiento del caso, conforme a los plazos
            legales aplicables.
          </p>
        </section>
      </div>
    </article>
  );
}
