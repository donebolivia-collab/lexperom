import { Badge } from "@/components/ui/badge";
import { URGENCY_LABELS } from "./labels";
import type { UrgencyLevel } from "@/types/database";

export function UrgencyBadge({ urgency }: { urgency: UrgencyLevel | null }) {
  if (!urgency) return <Badge variant="neutral">Sin evaluar</Badge>;
  return <Badge variant={urgency}>{URGENCY_LABELS[urgency]}</Badge>;
}
