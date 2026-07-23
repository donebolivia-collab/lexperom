"use client";

import { MessageCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContactMethodValue } from "@/validators/consultation";

interface ContactMethodSelectorProps {
  method: ContactMethodValue;
  onMethodChange: (method: ContactMethodValue) => void;
  fullName: string;
  onFullNameChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  errors?: Partial<Record<"phone" | "email", string>>;
}

const TABS: { value: ContactMethodValue; label: string; icon: typeof MessageCircle }[] = [
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { value: "email", label: "Correo electrónico", icon: Mail },
];

/**
 * Selección de contacto + campos, fusionados en una sola tarjeta con el
 * mismo lenguaje visual que IntakeComposer: pestañas arriba, campo
 * relevante y nombre abajo, separados por líneas internas en vez de
 * bloques sueltos.
 */
export function ContactMethodSelector({
  method,
  onMethodChange,
  fullName,
  onFullNameChange,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
  errors,
}: ContactMethodSelectorProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink">
        ¿Cómo prefieres que te contactemos para darte la respuesta?
      </p>

      <div className="overflow-hidden rounded-lg border-2 border-brand bg-surface shadow-sm">
        <div role="tablist" className="flex">
          {TABS.map(({ value, label, icon: Icon }, index) => {
            const selected = method === value;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onMethodChange(value)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-colors",
                  index === 0 && "border-r border-line",
                  selected
                    ? "bg-brand text-brand-foreground"
                    : "bg-surface text-ink-soft hover:bg-black/[0.03]"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>

        {method === "whatsapp" && (
          <div className="border-t border-line px-4 py-3">
            <label htmlFor="phone" className="block text-xs font-medium text-muted">
              Número de celular
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Ej. 71234567"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              aria-invalid={Boolean(errors?.phone)}
              className="mt-1 w-full border-0 bg-transparent p-0 text-base text-ink placeholder:text-muted focus:outline-none focus:ring-0"
            />
          </div>
        )}

        {method === "email" && (
          <div className="border-t border-line px-4 py-3">
            <label htmlFor="email" className="block text-xs font-medium text-muted">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              aria-invalid={Boolean(errors?.email)}
              className="mt-1 w-full border-0 bg-transparent p-0 text-base text-ink placeholder:text-muted focus:outline-none focus:ring-0"
            />
          </div>
        )}

        <div className="border-t border-line px-4 py-3">
          <label htmlFor="fullName" className="block text-xs font-medium text-muted">
            Tu nombre (opcional)
          </label>
          <input
            id="fullName"
            autoComplete="name"
            placeholder="¿Cómo te llamas?"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            className="mt-1 w-full border-0 bg-transparent p-0 text-base text-ink placeholder:text-muted focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {errors?.phone && method === "whatsapp" && (
        <p className="mt-1.5 text-xs text-urgency-critico">{errors.phone}</p>
      )}
      {errors?.email && method === "email" && (
        <p className="mt-1.5 text-xs text-urgency-critico">{errors.email}</p>
      )}
    </div>
  );
}
