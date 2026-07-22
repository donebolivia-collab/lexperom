import "server-only";
import type { AiAnalysisResult } from "./schema";

/**
 * Contrato que debe cumplir cualquier proveedor de IA. Cambiar de Gemini a
 * Claude/OpenAI/etc. significa escribir una clase que implemente esto —
 * nada más del sistema debe cambiar.
 */
export interface AIProvider {
  readonly name: string;
  readonly model: string;
  analyzeNarrative(narrative: string): Promise<AiAnalysisResult>;
}

export interface AIAnalysisOutcome {
  provider: string;
  model: string;
  promptVersion: string;
  result: AiAnalysisResult;
  raw: unknown;
}
