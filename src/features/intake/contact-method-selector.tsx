"use client";

import { MessageCircle, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ContactMethodValue } from "@/validators/consultation";

interface ContactMethodSelectorProps {
  method: ContactMethodValue | "";
  onMethodChange: (method: ContactMethodValue) => void;
  fullName: string;
  onFullNameChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  errors?: Partial<Record<"phone" | "email", string>>;
}

const OPTIONS: { value: ContactMethodValue; label: string; icon: typeof MessageCircle }[] = [
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { value: "llamada", label: "Llamada", icon: Phone },
  { value: "email", label: "Correo electrónico", icon: Mail },
];

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
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium text-ink-soft">
          ¿Cómo prefieres que te contactemos?
        </p>
        <div role="radiogroup" className="grid grid-cols-3 gap-2">
          {OPTIONS.map(({ value, label, icon: Icon }) => {
            const selected = method === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onMethodChange(value)}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-xs font-medium transition-colors",
                  selected
                    ? "border-brand bg-brand/[0.05] text-brand"
                    : "border-line text-ink-soft hover:bg-black/[0.03]"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {(method === "whatsapp" || method === "llamada") && (
        <div>
          <Label htmlFor="phone">Número de celular</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Ej. 71234567"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            aria-invalid={Boolean(errors?.phone)}
          />
          {errors?.phone && <p className="mt-1 text-xs text-urgency-critico">{errors.phone}</p>}
        </div>
      )}

      {method === "email" && (
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            aria-invalid={Boolean(errors?.email)}
          />
          {errors?.email && <p className="mt-1 text-xs text-urgency-critico">{errors.email}</p>}
        </div>
      )}

      {method && (
        <div>
          <Label htmlFor="fullName">Tu nombre (opcional)</Label>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="¿Cómo te llamas?"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
