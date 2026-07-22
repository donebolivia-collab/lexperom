import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SubmitConsultationResult } from "@/types/intake";

const CONTACT_METHOD_LABEL: Record<string, string> = {
  whatsapp: "WhatsApp",
  llamada: "Llamada telefónica",
  email: "Correo electrónico",
};

interface SubmissionConfirmationProps {
  result: Extract<SubmitConsultationResult, { ok: true }>;
}

export function SubmissionConfirmation({ result }: SubmissionConfirmationProps) {
  const date = new Date(result.createdAt);

  return (
    <Card className="mx-auto max-w-lg text-center">
      <CardContent className="flex flex-col items-center gap-4 py-10">
        <CheckCircle2 className="h-10 w-10 text-urgency-bajo" aria-hidden="true" />
        <div>
          <h2 className="text-xl font-semibold text-ink">Consulta recibida</h2>
          <p className="mt-1 text-sm text-muted">
            Tu información fue enviada correctamente para revisión.
          </p>
        </div>

        <div className="w-full rounded-lg border border-line bg-paper px-5 py-4 text-left text-sm">
          <dl className="space-y-2">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Consulta</dt>
              <dd className="font-mono font-medium text-ink">#{result.publicCode}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Fecha</dt>
              <dd className="text-ink">
                {date.toLocaleDateString("es-BO", { day: "2-digit", month: "long", year: "numeric" })}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Hora</dt>
              <dd className="text-ink">
                {date.toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" })}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Te contactaremos por</dt>
              <dd className="text-ink">{CONTACT_METHOD_LABEL[result.contactMethod]}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Archivos recibidos</dt>
              <dd className="text-ink">{result.documentsReceived}</dd>
            </div>
          </dl>
        </div>

        <p className="text-xs leading-relaxed text-muted">
          Guarda el número de tu consulta. Un abogado revisará tu información y te contactará
          por el medio que elegiste.
        </p>
      </CardContent>
    </Card>
  );
}
