import { FileText, Image as ImageIcon, Download } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ConsultationDocument } from "@/types/database";

const SIGNED_URL_TTL_SECONDS = 60 * 10; // 10 minutos

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function DocumentList({ documents }: { documents: ConsultationDocument[] }) {
  if (documents.length === 0) {
    return <p className="text-sm text-muted">No se adjuntaron documentos.</p>;
  }

  const supabase = await createSupabaseServerClient();
  const withUrls = await Promise.all(
    documents.map(async (doc) => {
      const { data } = await supabase.storage
        .from("consultation-documents")
        .createSignedUrl(doc.storage_path, SIGNED_URL_TTL_SECONDS);
      return { ...doc, signedUrl: data?.signedUrl ?? null };
    })
  );

  return (
    <ul className="space-y-2">
      {withUrls.map((doc) => (
        <li
          key={doc.id}
          className="flex items-center gap-3 rounded-md border border-line bg-paper px-3 py-2 text-sm"
        >
          {doc.mime_type.startsWith("image/") ? (
            <ImageIcon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          ) : (
            <FileText className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          )}
          <span className="min-w-0 flex-1 truncate text-ink">{doc.original_filename}</span>
          <span className="shrink-0 text-xs text-muted">{formatSize(doc.size_bytes)}</span>
          {doc.signedUrl && (
            <a
              href={doc.signedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-brand hover:text-brand-strong"
              aria-label={`Descargar ${doc.original_filename}`}
            >
              <Download className="h-4 w-4" />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
