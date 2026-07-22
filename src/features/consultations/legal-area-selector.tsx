"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { confirmLegalArea } from "./actions";
import type { LegalArea } from "@/types/database";

const LEGAL_AREAS: { value: LegalArea; label: string }[] = [
  { value: "penal", label: "Penal" },
  { value: "civil", label: "Civil" },
  { value: "familiar", label: "Familiar" },
  { value: "laboral", label: "Laboral" },
  { value: "administrativo", label: "Administrativo" },
  { value: "constitucional", label: "Constitucional" },
  { value: "comercial", label: "Comercial" },
  { value: "seguros", label: "Seguros" },
  { value: "accidentes", label: "Accidentes" },
  { value: "transito", label: "Tránsito" },
  { value: "responsabilidad_civil", label: "Responsabilidad civil" },
  { value: "deudas", label: "Deudas" },
  { value: "contratos", label: "Contratos" },
  { value: "sucesiones", label: "Sucesiones" },
  { value: "propiedad", label: "Propiedad" },
  { value: "empresas", label: "Empresas" },
  { value: "otros", label: "Otros" },
];

interface LegalAreaSelectorProps {
  consultationId: string;
  currentArea: LegalArea | null;
  confirmed: boolean;
}

export function LegalAreaSelector({ consultationId, currentArea, confirmed }: LegalAreaSelectorProps) {
  const [value, setValue] = useState<string>(currentArea ?? "");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleConfirm() {
    if (!value) return;
    setError(null);
    startTransition(async () => {
      try {
        await confirmLegalArea(consultationId, value);
      } catch {
        setError("No se pudo confirmar la materia.");
      }
    });
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-9 rounded-md border border-line bg-surface px-2 text-sm text-ink"
        >
          <option value="">Sin confirmar</option>
          {LEGAL_AREAS.map((area) => (
            <option key={area.value} value={area.value}>
              {area.label}
            </option>
          ))}
        </select>
        <Button type="button" size="sm" variant="secondary" disabled={isPending || !value} onClick={handleConfirm}>
          {confirmed ? "Actualizar" : "Confirmar"}
        </Button>
        {confirmed && <span className="text-xs text-urgency-bajo">Confirmada por el equipo</span>}
      </div>
      {error && <p className="mt-1 text-xs text-urgency-critico">{error}</p>}
    </div>
  );
}
