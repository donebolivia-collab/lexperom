import "server-only";

// Sin caracteres ambiguos (0/O, 1/I/L) para que el código sea fácil de leer
// por teléfono o WhatsApp.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/** Genera un código público no secuencial, ej. "A7K29P". No expone el id interno. */
export function generatePublicCode(length = 6): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let code = "";
  for (let i = 0; i < length; i++) {
    code += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return code;
}
