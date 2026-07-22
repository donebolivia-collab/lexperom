import "server-only";

/**
 * Rate limiter en memoria, de ventana fija, por clave (IP).
 *
 * Suficiente para el MVP en un único proceso. En despliegues serverless con
 * múltiples instancias (Vercel) el conteo es por instancia, no global —
 * limitación conocida. Migrar a Vercel KV/Upstash Redis en Fase 2 si el
 * volumen de tráfico o abuso lo justifica.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, { count: number; windowStart: number }>();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(key, { count: 1, windowStart: now });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, retryAfterMs: WINDOW_MS - (now - entry.windowStart) };
  }

  entry.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

// Evita que el Map crezca indefinidamente en procesos de larga duración.
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (now - entry.windowStart > WINDOW_MS) hits.delete(key);
  }
}, WINDOW_MS).unref?.();
