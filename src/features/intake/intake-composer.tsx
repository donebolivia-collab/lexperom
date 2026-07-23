"use client";

import { useId, useState } from "react";
import { Paperclip, X, FileText, Image as ImageIcon } from "lucide-react";
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
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Cuadro de relato + adjuntar documentos como una sola tarjeta, siguiendo
 * el patrón de los compositores de chat modernos (Claude, ChatGPT, Gmail):
 * el clip vive dentro del mismo borde que el texto, no como bloque aparte.
 */
export function IntakeComposer({
  narrative,
  onNarrativeChange,
  files,
  onFilesChange,
  autoFocus,
  narrativeError,
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
          className="h-[154px] w-full resize-none border-0 bg-transparent px-4 py-3 text-base leading-relaxed text-ink placeholder:text-muted focus:outline-none focus:ring-0"
        />

        <div className="flex items-center justify-between border-t border-line px-3 py-2">
          <label
            htmlFor={attachId}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md p-1.5 text-muted hover:bg-black/[0.05] hover:text-ink-soft"
            title="Adjuntar documentos o fotografías"
          >
            <Paperclip className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Adjuntar documentos o fotografías</span>
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
      </div>

      {narrativeError && (
        <p id="narrative-error" className="mt-1.5 text-xs text-urgency-critico">
          {narrativeError}
        </p>
      )}
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
