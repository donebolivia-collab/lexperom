import "server-only";
import { GeminiProvider } from "./providers/gemini";
import { RuleBasedProvider } from "./providers/rule-based";
import type { AIAnalysisOutcome, AIProvider } from "./provider";
import type { AiAnalysisResult } from "./schema";

const PROMPT_VERSION = "v1";

/**
 * Punto único de selección de proveedor. Si más adelante se paga por
 * Claude/OpenAI, este es el único lugar que cambia.
 */
function resolveProvider(): AIProvider {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    return new GeminiProvider(apiKey);
  }
  return new RuleBasedProvider();
}

/**
 * Análisis preliminar único por consulta. Internamente hace UNA llamada al
 * proveedor (eficiente en cuota gratuita) y de ahí se derivan las funciones
 * granulares de abajo, que existen como fachada estable por si en el futuro
 * conviene separarlas en llamadas independientes (p. ej. analyzeDocument
 * corriendo aparte cuando se implemente OCR).
 */
export async function runPreliminaryAnalysis(
  narrative: string
): Promise<AIAnalysisOutcome> {
  const provider = resolveProvider();
  const result = await provider.analyzeNarrative(narrative);

  return {
    provider: provider.name,
    model: provider.model,
    promptVersion: PROMPT_VERSION,
    result,
    raw: result,
  };
}

export async function summarizeConsultation(narrative: string): Promise<string> {
  return (await runPreliminaryAnalysis(narrative)).result.summary;
}

export async function classifyLegalArea(narrative: string): Promise<string[]> {
  return (await runPreliminaryAnalysis(narrative)).result.possibleAreas;
}

export async function detectUrgency(
  narrative: string
): Promise<{ level: AiAnalysisResult["urgency"]; reason: string }> {
  const { result } = await runPreliminaryAnalysis(narrative);
  return { level: result.urgency, reason: result.urgencyReason };
}

export async function extractEntities(narrative: string) {
  const { result } = await runPreliminaryAnalysis(narrative);
  return {
    people: result.peopleMentioned,
    institutions: result.institutionsMentioned,
    dates: result.datesMentioned,
    places: result.placesMentioned,
    amounts: result.amountsMentioned,
  };
}

export async function identifyMissingInformation(narrative: string): Promise<string[]> {
  return (await runPreliminaryAnalysis(narrative)).result.missingInformation;
}

export async function suggestFollowUpQuestions(narrative: string): Promise<string[]> {
  return (await runPreliminaryAnalysis(narrative)).result.suggestedQuestions;
}

/**
 * Fase 2 — requiere OCR/almacenamiento de texto extraído. No implementado
 * en el MVP: los documentos adjuntos se guardan pero no se analizan.
 */
export async function analyzeDocument(): Promise<never> {
  throw new Error("analyzeDocument no está implementado en esta fase (requiere OCR).");
}

/** Fase 2 — cronología a partir de documentos y relato. No implementado en el MVP. */
export async function buildTimeline(): Promise<never> {
  throw new Error("buildTimeline no está implementado en esta fase.");
}
