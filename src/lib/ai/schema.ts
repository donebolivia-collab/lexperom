import { z } from "zod";

/**
 * Forma validada del análisis preliminar, sin importar qué proveedor lo
 * generó. La salida cruda del proveedor SIEMPRE pasa por este schema antes
 * de tocar la base de datos — nunca confiamos en que el modelo respete el
 * formato pedido.
 */
export const aiAnalysisResultSchema = z.object({
  summary: z.string().max(1200),
  possibleAreas: z.array(z.string().max(80)).max(5),
  urgency: z.enum(["critico", "alto", "medio", "bajo"]),
  urgencyReason: z.string().max(400),
  mainFacts: z.array(z.string().max(200)).max(10),
  peopleMentioned: z.array(z.string().max(120)).max(15),
  institutionsMentioned: z.array(z.string().max(120)).max(15),
  datesMentioned: z.array(z.string().max(60)).max(15),
  placesMentioned: z.array(z.string().max(120)).max(15),
  amountsMentioned: z.array(z.string().max(60)).max(10),
  missingInformation: z.array(z.string().max(200)).max(8),
  suggestedQuestions: z.array(z.string().max(200)).max(8),
  possibleNextSteps: z.array(z.string().max(200)).max(6),
  redFlags: z.array(z.string().max(200)).max(8),
});

export type AiAnalysisResult = z.infer<typeof aiAnalysisResultSchema>;

export const EMPTY_ANALYSIS_ENTITIES: Pick<
  AiAnalysisResult,
  | "peopleMentioned"
  | "institutionsMentioned"
  | "datesMentioned"
  | "placesMentioned"
  | "amountsMentioned"
> = {
  peopleMentioned: [],
  institutionsMentioned: [],
  datesMentioned: [],
  placesMentioned: [],
  amountsMentioned: [],
};
