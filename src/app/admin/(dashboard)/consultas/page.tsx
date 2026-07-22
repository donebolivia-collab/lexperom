import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/features/consultations/status-badge";
import { UrgencyBadge } from "@/features/consultations/urgency-badge";
import type { Consultation, Contact } from "@/types/database";

export default async function ConsultasPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("consultations")
    .select("*, contact:contacts(*)")
    .order("created_at", { ascending: false })
    .limit(100);

  const consultations = (data ?? []) as (Consultation & { contact: Contact })[];

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Consultas</h1>
      <p className="mt-1 text-sm text-muted">{consultations.length} consultas recientes.</p>

      {error && <p className="mt-4 text-sm text-urgency-critico">No se pudieron cargar las consultas.</p>}

      <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Código</th>
              <th className="px-4 py-3 font-medium">Contacto</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Urgencia</th>
              <th className="px-4 py-3 font-medium">Recibida</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {consultations.map((c) => (
              <tr key={c.id} className="hover:bg-paper/60">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/consultas/${c.id}`}
                    className="font-mono font-medium text-brand hover:underline"
                  >
                    #{c.public_code}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  {c.contact?.full_name || "Sin nombre"}
                  <span className="ml-1.5 text-xs text-muted">· {c.contact?.preferred_method}</span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3">
                  <UrgencyBadge urgency={c.urgency} />
                </td>
                <td className="px-4 py-3 text-muted">
                  {new Date(c.created_at).toLocaleString("es-BO", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}

            {consultations.length === 0 && !error && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  Todavía no hay consultas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
