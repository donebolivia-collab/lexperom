"use client";

import { useId, useState } from "react";
import { Paperclip, X, FileText, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ALLOWED_DOCUMENT_MIME_TYPES,
  MAX_FILES,
  MAX_FILE_SIZE_BYTES,
  isAllowedDocumentType,
} from "@/validators/consultation";

interface DocumentUploaderProps {
  files: File[];
  onChange: (files: File[]) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentUploader({ files, onChange }: DocumentUploaderProps) {
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addFiles(incoming: FileList | null) {
    if (!incoming || incoming.length === 0) return;
    setError(null);

    const next = [...files];
    for (const file of Array.from(incoming)) {
      if (next.length >= MAX_FILES) {
        setError(`Puedes adjuntar hasta ${MAX_FILES} archivos.`);
        break;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`"${file.name}" supera el tamaño máximo (15 MB).`);
        continue;
      }
      if (!isAllowedDocumentType(file.type)) {
        setError(`"${file.name}" tiene un formato no permitido.`);
        continue;
      }
      next.push(file);
    }
    onChange(next);
  }

  function removeFile(index: number) {
    onChange(files.filter((_, i) => i !== index));
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
      >
        <label
          htmlFor={inputId}
          className={cn(
            "inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-brand hover:underline",
            isDragging && "text-header-accent"
          )}
        >
          <Paperclip className="h-4 w-4" aria-hidden="true" />
          Adjuntar documentos o fotografías (opcional)
        </label>
        <input
          id={inputId}
          type="file"
          multiple
          accept={ALLOWED_DOCUMENT_MIME_TYPES.join(",")}
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
          className="sr-only"
        />
      </div>

      {error && <p className="mt-2 text-xs text-urgency-critico">{error}</p>}

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
