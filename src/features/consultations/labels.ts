import type { ConsultationStatus, UrgencyLevel } from "@/types/database";

export const STATUS_LABELS: Record<ConsultationStatus, string> = {
  nueva: "Nueva",
  en_revision: "En revisión",
  requiere_informacion: "Requiere información",
  contactar: "Por contactar",
  contactado: "Contactado",
  consulta_agendada: "Consulta agendada",
  propuesta_enviada: "Propuesta enviada",
  cliente: "Cliente",
  no_viable: "No viable",
  archivada: "Archivada",
};

export const STATUS_ORDER: ConsultationStatus[] = [
  "nueva",
  "en_revision",
  "requiere_informacion",
  "contactar",
  "contactado",
  "consulta_agendada",
  "propuesta_enviada",
  "cliente",
  "no_viable",
  "archivada",
];

export const URGENCY_LABELS: Record<UrgencyLevel, string> = {
  critico: "Crítico",
  alto: "Alto",
  medio: "Medio",
  bajo: "Bajo",
};
