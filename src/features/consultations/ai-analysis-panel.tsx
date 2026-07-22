import { Sparkles } from "lucide-react";
import type { AiAnalysis } from "@/types/database";

function List({ items }: { items: string[] | null | undefined }) {
  if (!items || items.length === 0) return <p className="text-sm text-muted">—</p>;
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm text-ink-soft">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function AiAnalysisPanel({ analysis }: { analysis: AiAnalysis | null }) {
  if (!analysis) {
    return (
      <p className="text-sm text-muted">
        Todavía no hay análisis preliminar disponible para esta consulta.
      </p>
    );
  }

  const entities = analysis.entities as Record<string, string[]> | null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-md bg-accent/10 px-3 py-2 text-xs font-medium text-accent">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        ANÁLISIS PRELIMINAR ASISTIDO POR IA — REQUIERE REVISIÓN PROFESIONAL
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Resumen</p>
        <p className="mt-1 text-sm text-ink-soft">{analysis.summary || "—"}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Posibles materias</p>
          <List items={analysis.possible_areas} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Información faltante</p>
          <List items={analysis.missing_information} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Preguntas sugeridas</p>
          <List items={analysis.suggested_questions} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Señales de alerta</p>
          <List items={analysis.red_flags} />
        </div>
      </div>

      {entities && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Personas</p>
            <List items={entities.people} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Instituciones</p>
            <List items={entities.institutions} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Fechas</p>
            <List items={entities.dates} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Lugares</p>
            <List items={entities.places} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Montos</p>
            <List items={entities.amounts} />
          </div>
        </div>
      )}

      <p className="text-xs text-muted">
        Generado por {analysis.provider} ({analysis.model}) el{" "}
        {new Date(analysis.created_at).toLocaleString("es-BO")}.
      </p>
    </div>
  );
}
