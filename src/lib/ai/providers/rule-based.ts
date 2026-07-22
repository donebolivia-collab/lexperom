import "server-only";
import type { AIProvider } from "../provider";
import type { AiAnalysisResult } from "../schema";
import { EMPTY_ANALYSIS_ENTITIES } from "../schema";

/**
 * Proveedor de respaldo sin IA generativa. Se usa cuando no hay
 * GEMINI_API_KEY configurada, para que el intake nunca dependa de un
 * proveedor externo para funcionar. Detecta urgencia por palabras clave
 * (sección 15 del brief) y deja el resto para revisión humana explícita.
 */

const URGENT_KEYWORDS: Record<"critico" | "alto", string[]> = {
  critico: [
    "aprehen",
    "detenc",
    "detenid",
    "audiencia mañana",
    "audiencia hoy",
    "violencia",
    "riesgo de vida",
    "menor de edad en riesgo",
    "hospitaliz",
    "fallec",
    "muri",
  ],
  alto: [
    "citaci",
    "vencimiento",
    "vence el",
    "desalojo",
    "remate",
    "medida cautelar",
    "plazo",
    "accidente",
    "denuncia",
  ],
};

function detectKeywordUrgency(narrative: string): { level: AiAnalysisResult["urgency"]; reason: string } {
  const text = narrative.toLowerCase();

  for (const keyword of URGENT_KEYWORDS.critico) {
    if (text.includes(keyword)) {
      return {
        level: "critico",
        reason: `Se detectó la palabra clave "${keyword}" — requiere revisión humana inmediata.`,
      };
    }
  }
  for (const keyword of URGENT_KEYWORDS.alto) {
    if (text.includes(keyword)) {
      return {
        level: "alto",
        reason: `Se detectó la palabra clave "${keyword}" — revisar con prioridad.`,
      };
    }
  }
  return {
    level: "medio",
    reason: "No se detectaron palabras clave de urgencia. Pendiente de revisión humana para confirmar.",
  };
}

export class RuleBasedProvider implements AIProvider {
  readonly name = "rule-based";
  readonly model = "keyword-heuristics-v1";

  async analyzeNarrative(narrative: string): Promise<AiAnalysisResult> {
    const { level, reason } = detectKeywordUrgency(narrative);
    const trimmed = narrative.trim();
    const summary =
      trimmed.length > 220 ? `${trimmed.slice(0, 220).trim()}…` : trimmed;

    return {
      summary,
      possibleAreas: [],
      urgency: level,
      urgencyReason: reason,
      mainFacts: [],
      ...EMPTY_ANALYSIS_ENTITIES,
      missingInformation: [
        "Análisis por IA generativa no configurado — este resumen es automático por palabras clave.",
      ],
      suggestedQuestions: [],
      possibleNextSteps: [],
      redFlags: [],
    };
  }
}
