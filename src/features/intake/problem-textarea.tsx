"use client";

import { Textarea } from "@/components/ui/textarea";
import { NARRATIVE_MAX_LENGTH } from "@/validators/consultation";

interface ProblemTextareaProps {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  error?: string;
}

export function ProblemTextarea({ value, onChange, autoFocus, error }: ProblemTextareaProps) {
  return (
    <div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Detalla tu consulta aquí. Un abogado la revisará y te responderá."
        autoFocus={autoFocus}
        maxLength={NARRATIVE_MAX_LENGTH}
        rows={5}
        aria-label="Describe tu problema legal"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "narrative-error" : undefined}
        className="h-[154px] resize-none overflow-y-auto border-2 border-header-accent text-lg leading-relaxed shadow-sm"
      />
      <div className="mt-2 flex items-center justify-end text-xs text-muted">
        {error && (
          <span id="narrative-error" className="mr-auto text-urgency-critico">
            {error}
          </span>
        )}
        <span aria-hidden="true">
          {value.length}/{NARRATIVE_MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
