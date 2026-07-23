"use client";

import { useId, useState } from "react";
import { Paperclip, X, FileText, Image as ImageIcon, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ALLOWED_DOCUMENT_MIME_TYPES,
  MAX_FILES,
  MAX_FILE_SIZE_BYTES,
  NARRATIVE_MAX_LENGTH,
  isAllowedDocumentType,
} from "@/validators/consultation";

interface IntakeComposerProps {
  narrative: string;
  onNarrativeChange: (value: string) => void;
  files: File[];
  onFilesChange: (files: File[]) => void;
  autoFocus?: boolean;
  narrativeError?: string;
  phone: string;
  onPhoneChange: (value: string) => void;
  phoneError?: string;
  fullName: string;
  onFullNameChange: (value: string) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Cada fila se ilumina con un tono suave del azul de marca al enfocarse,
// ya que los campos individuales no tienen su propio borde para resaltar.
const FOCUS_ROW = "transition-colors focus-within:bg-brand/[0.04]";
// Mismo padding en las 3 filas (adjuntar, celular, nombre) para que todas
// midan igual de alto, y mismo estilo de línea divisoria entre ellas.
const ROW = "border-t border-brand/35 px-4 py-3";
// Etiqueta uniforme: mismo ícono (14px), misma fuente y tamaño en las 3.
const ROW_LABEL = "flex items-center gap-1.5 text-xs font-medium text-ink";
const ROW_ICON = "h-3.5 w-3.5 shrink-0";

/**
 * Toda la consulta en una sola tarjeta, siguiendo el patrón de los
 * compositores de chat modernos (Claude, ChatGPT, Gmail): relato,
 * adjuntar, WhatsApp y nombre viven dentro del mismo borde, separados por
 * líneas internas — no como bloques sueltos. WhatsApp es el único canal
 * visible: es el que domina en este mercado y el correo aún no está
 * activo en el sitio, así que no tiene sentido pedirlo aquí todavía.
 */
export function IntakeComposer({
  narrative,
  onNarrativeChange,
  files,
  onFilesChange,
  autoFocus,
  narrativeError,
  phone,
  onPhoneChange,
  phoneError,
  fullName,
  onFullNameChange,
}: IntakeComposerProps) {
  const attachId = useId();
  const [isDragging, setIsDragging] = useState(false);
  const [attachError, setAttachError] = useState<string | null>(null);

  function addFiles(incoming: FileList | null) {
    if (!incoming || incoming.length === 0) return;
    setAttachError(null);

    const next = [...files];
    for (const file of Array.from(incoming)) {
      if (next.length >= MAX_FILES) {
        setAttachError(`Puedes adjuntar hasta ${MAX_FILES} archivos.`);
        break;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setAttachError(`"${file.name}" supera el tamaño máximo (15 MB).`);
        continue;
      }
      if (!isAllowedDocumentType(file.type)) {
        setAttachError(`"${file.name}" tiene un formato no permitido.`);
        continue;
      }
      next.push(file);
    }
    onFilesChange(next);
  }

  function removeFile(index: number) {
    onFilesChange(files.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "overflow-hidden rounded-lg border-2 bg-surface shadow-sm transition-colors",
          narrativeError ? "border-urgency-critico" : "border-brand",
          isDragging && "bg-brand/[0.03]"
        )}
      >
        <textarea
          value={narrative}
          onChange={(e) => onNarrativeChange(e.target.value)}
          placeholder="Detalla tu consulta aquí. Un abogado la revisará y te responderá."
          autoFocus={autoFocus}
          maxLength={NARRATIVE_MAX_LENGTH}
          aria-label="Describe tu problema legal"
          aria-invalid={Boolean(narrativeError)}
          aria-describedby={narrativeError ? "narrative-error" : undefined}
          className="h-[154px] w-full resize-none border-0 bg-transparent px-4 py-3 text-base leading-relaxed text-ink placeholder:text-muted transition-colors focus:bg-brand/[0.04] focus:outline-none focus:ring-0"
        />

        <div className={cn(ROW, FOCUS_ROW)}>
          <div className="flex items-center justify-between">
            <label htmlFor={attachId} className={cn(ROW_LABEL, "cursor-pointer")}>
              <Paperclip className={ROW_ICON} aria-hidden="true" />
              Adjuntar documentos
            </label>
            <input
              id={attachId}
              type="file"
              multiple
              accept={ALLOWED_DOCUMENT_MIME_TYPES.join(",")}
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
              className="sr-only"
            />
            <span aria-hidden="true" className="text-xs text-muted">
              {narrative.length}/{NARRATIVE_MAX_LENGTH}
            </span>
          </div>
          <p className="mt-1 text-base text-muted">PDF, Word o fotos — hasta 6 archivos, 15 MB c/u</p>
        </div>

        <div className={cn(ROW, FOCUS_ROW)}>
          <label htmlFor="phone" className={ROW_LABEL}>
            <Phone className={ROW_ICON} aria-hidden="true" />
            Tu número de celular
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Ej. 71234567"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            aria-invalid={Boolean(phoneError)}
            className="mt-1 w-full border-0 bg-transparent p-0 text-base text-ink placeholder:text-muted focus:outline-none focus:ring-0"
          />
        </div>

        <div className={cn(ROW, FOCUS_ROW)}>
          <label htmlFor="fullName" className={ROW_LABEL}>
            <User className={ROW_ICON} aria-hidden="true" />
            Tu nombre (opcional)
          </label>
          <input
            id="fullName"
            autoComplete="name"
            placeholder="¿Cómo te llamas?"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            className="mt-1 w-full border-0 bg-transparent p-0 text-base text-ink placeholder:text-muted focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {narrativeError && (
        <p id="narrative-error" className="mt-1.5 text-xs text-urgency-critico">
          {narrativeError}
        </p>
      )}
      {phoneError && <p className="mt-1.5 text-xs text-urgency-critico">{phoneError}</p>}
      {attachError && <p className="mt-1.5 text-xs text-urgency-critico">{attachError}</p>}

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-md border border-line bg-paper px-3 py-2 text-sm"
            >
              {file.type.startsWith("image/") ? (
                <ImageIcon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              ) : (
                <FileText className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              )}
              <span className="min-w-0 flex-1 truncate text-ink">{file.name}</span>
              <span className="shrink-0 text-xs text-muted">{formatSize(file.size)}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Quitar ${file.name}`}
                className="shrink-0 rounded p-1 text-muted hover:bg-black/[0.05] hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
