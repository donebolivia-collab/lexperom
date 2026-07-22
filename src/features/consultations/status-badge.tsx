import { Badge, type BadgeProps } from "@/components/ui/badge";
import { STATUS_LABELS } from "./labels";
import type { ConsultationStatus } from "@/types/database";

const VARIANT_BY_STATUS: Record<ConsultationStatus, NonNullable<BadgeProps["variant"]>> = {
  nueva: "brand",
  en_revision: "neutral",
  requiere_informacion: "alto",
  contactar: "neutral",
  contactado: "neutral",
  consulta_agendada: "brand",
  propuesta_enviada: "brand",
  cliente: "bajo",
  no_viable: "critico",
  archivada: "neutral",
};

export function StatusBadge({ status }: { status: ConsultationStatus }) {
  return <Badge variant={VARIANT_BY_STATUS[status]}>{STATUS_LABELS[status]}</Badge>;
}
