/** Reduce un nombre de archivo a algo seguro para usar como storage path. */
export function sanitizeFilename(filename: string): string {
  const trimmed = filename.trim().slice(-180);
  const lastDot = trimmed.lastIndexOf(".");
  const base = lastDot > 0 ? trimmed.slice(0, lastDot) : trimmed;
  const ext = lastDot > 0 ? trimmed.slice(lastDot + 1) : "";

  const safeBase = base
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "documento";

  const safeExt = ext.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10);

  return safeExt ? `${safeBase}.${safeExt}` : safeBase;
}
