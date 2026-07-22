import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import type { Consultation } from "@/types/database";

function startOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}
function startOfWeek(d: Date) {
  const copy = startOfDay(d);
  const day = copy.getDay();
  const diff = (day + 6) % 7; // semana empieza lunes
  copy.setDate(copy.getDate() - diff);
  return copy;
}
function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export default async function DashboardHomePage() {
  const supabase = await createSupabaseServerClient();
  const since = new Date();
  since.setDate(since.getDate() - 90);

  const { data } = await supabase
    .from("consultations")
    .select("id, status, urgency, created_at")
    .gte("created_at", since.toISOString());

  const consultations = (data ?? []) as Pick<Consultation, "id" | "status" | "urgency" | "created_at">[];

  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = startOfWeek(now);
  const monthStart = startOfMonth(now);

  const countSince = (start: Date) =>
    consultations.filter((c) => new Date(c.created_at) >= start).length;

  const stats = {
    today: countSince(todayStart),
    week: countSince(weekStart),
    month: countSince(monthStart),
    nuevas: consultations.filter((c) => c.status === "nueva").length,
    urgentes: consultations.filter((c) => c.urgency === "critico" || c.urgency === "alto").length,
    esperandoInfo: consultations.filter((c) => c.status === "requiere_informacion").length,
    contactadas: consultations.filter((c) => c.status === "contactado").length,
    agendadas: consultations.filter((c) => c.status === "consulta_agendada").length,
    clientes: consultations.filter((c) => c.status === "cliente").length,
    noViables: consultations.filter((c) => c.status === "no_viable").length,
  };

  const conversion =
    consultations.length > 0
      ? Math.round((stats.clientes / consultations.length) * 100)
      : 0;

  const cards = [
    { label: "Consultas hoy", value: stats.today },
    { label: "Esta semana", value: stats.week },
    { label: "Este mes", value: stats.month },
    { label: "Nuevas sin revisar", value: stats.nuevas },
    { label: "Urgentes (alto/crítico)", value: stats.urgentes },
    { label: "Esperando información", value: stats.esperandoInfo },
    { label: "Contactadas", value: stats.contactadas },
    { label: "Agendadas", value: stats.agendadas },
    { label: "Convertidas a cliente", value: stats.clientes },
    { label: "No viables", value: stats.noViables },
    { label: "Conversión (90 días)", value: `${conversion}%` },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Resumen de los últimos 90 días.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="p-5">
              <p className="text-2xl font-semibold text-ink">{card.value}</p>
              <p className="mt-1 text-xs text-muted">{card.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
