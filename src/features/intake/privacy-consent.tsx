"use client";

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

interface PrivacyConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function PrivacyConsent({ checked, onChange, error }: PrivacyConsentProps) {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm text-ink">
        <Checkbox
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={Boolean(error)}
        />
        <span>
          He leído y acepto la{" "}
          <Link href="/privacidad" className="text-brand underline underline-offset-2" target="_blank">
            Política de Privacidad
          </Link>{" "}
          y los{" "}
          <Link href="/terminos" className="text-brand underline underline-offset-2" target="_blank">
            Términos de Uso
          </Link>
          .
        </span>
      </label>
      {error && <p className="mt-1.5 pl-8 text-xs text-urgency-critico">{error}</p>}
    </div>
  );
}
