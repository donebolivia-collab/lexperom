"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { updateConsultationStatus } from "./actions";
import type { ConsultationStatus } from "@/types/database";

interface StatusActionsProps {
  consultationId: string;
  currentStatus: ConsultationStatus;
}

const ACTIONS: { label: string; status: ConsultationStatus; variant?: "primary" | "secondary" }[] = [
  { label: "Solicitar información", status: "requiere_informacion", variant: "secondary" },
  { label: "Marcar como contactado", status: "contactado", variant: "secondary" },
  { label: "Agendar consulta", status: "consulta_agendada", variant: "secondary" },
  { label: "Aceptar como cliente", status: "cliente" },
  { label: "Marcar no viable", status: "no_viable", variant: "secondary" },
  { label: "Archivar", status: "archivada", variant: "secondary" },
];

export function StatusActions({ consultationId, currentStatus }: StatusActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick(status: ConsultationStatus) {
    setError(null);
    startTransition(async () => {
      try {
        await updateConsultationStatus(consultationId, status);
      } catch {
        setError("No se pudo actualizar el estado. Intenta nuevamente.");
      }
    });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {ACTIONS.filter((action) => action.status !== currentStatus).map((action) => (
          <Button
            key={action.status}
            type="button"
            size="sm"
            variant={action.variant ?? "primary"}
            disabled={isPending}
            onClick={() => handleClick(action.status)}
          >
            {action.label}
          </Button>
        ))}
      </div>
      {error && <p className="mt-2 text-xs text-urgency-critico">{error}</p>}
    </div>
  );
}
