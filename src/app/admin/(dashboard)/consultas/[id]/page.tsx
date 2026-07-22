import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/features/consultations/status-badge";
import { UrgencyBadge } from "@/features/consultations/urgency-badge";
import { StatusActions } from "@/features/consultations/status-actions";
import { NotesPanel } from "@/features/consultations/notes-panel";
import { AiAnalysisPanel } from "@/features/consultations/ai-analysis-panel";
import { DocumentList } from "@/features/consultations/document-list";
import { LegalAreaSelector } from "@/features/consultations/legal-area-selector";
import type {
  AiAnalysis,
  Consultation,
  Contact,
  ConsultationDocument,
  Note,
} from "@/types/database";

const CONTACT_METHOD_LABEL: Record<string, string> = {
  whatsapp: "WhatsApp",
  llamada: "Llamada",
  email: "Correo electrónico",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ConsultationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("consultations")
    .select(
      "*, contact:contacts(*), documents(*), ai_analyses(*), notes(*)"
    )
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  const consultation = data as Consultation & {
    contact: Contact;
    documents: ConsultationDocument[];
    ai_analyses: AiAnalysis[];
    notes: Note[];
  };

  const latestAnalysis = [...consultation.ai_analyses].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )[0] ?? null;

  const notes = [...consultation.notes].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-muted">#{consultation.public_code}</p>
          <h1 className="mt-1 text-xl font-semibold text-ink">
            {consultation.contact.full_name || "Consulta sin nombre"}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={consultation.status} />
            <UrgencyBadge urgency={consultation.urgency} />
          </div>
        </div>
        <div className="text-right text-sm text-muted">
          <p>{new Date(consultation.created_at).toLocaleString("es-BO")}</p>
          <p className="mt-1">
            Contactar por: <strong className="text-ink-soft">
              {CONTACT_METHOD_LABEL[consultation.contact.preferred_method]}
            </strong>
          </p>
          {consultation.contact.phone && <p>{consultation.contact.phone}</p>}
          {consultation.contact.email && <p>{consultation.contact.email}</p>}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acciones</CardTitle>
        </CardHeader>
        <CardContent>
          <StatusActions consultationId={consultation.id} currentStatus={consultation.status} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Relato original</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">
            {consultation.narrative}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Análisis preliminar</CardTitle>
        </CardHeader>
        <CardContent>
          <AiAnalysisPanel analysis={latestAnalysis} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Materia jurídica</CardTitle>
        </CardHeader>
        <CardContent>
          <LegalAreaSelector
            consultationId={consultation.id}
            currentArea={consultation.legal_area}
            confirmed={consultation.legal_area_confirmed}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <DocumentList documents={consultation.documents} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notas internas</CardTitle>
        </CardHeader>
        <CardContent>
          <NotesPanel consultationId={consultation.id} notes={notes} />
        </CardContent>
      </Card>
    </div>
  );
}
