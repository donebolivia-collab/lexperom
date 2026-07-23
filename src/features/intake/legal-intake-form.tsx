"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { IntakeComposer } from "./intake-composer";
import { PrivacyConsent } from "./privacy-consent";
import { SubmissionConfirmation } from "./submission-confirmation";
import { useIntakeDraft } from "./use-intake-draft";
import { submitConsultation } from "./actions";
import { captureAttributionOnce, getStoredAttribution } from "@/lib/attribution";
import { NARRATIVE_MIN_LENGTH } from "@/validators/consultation";
import type { SubmitConsultationResult } from "@/types/intake";

// Único canal visible en el formulario: WhatsApp domina este mercado y el
// correo todavía no está activo en el sitio (ver Canales de Contacto).
const CONTACT_METHOD = "whatsapp" as const;

export function LegalIntakeForm() {
  const { restoredDraft, saveDraft, clearDraft } = useIntakeDraft();

  const [narrative, setNarrative] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [draftDismissed, setDraftDismissed] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<Extract<SubmitConsultationResult, { ok: true }> | null>(
    null
  );
  const [isPending, startTransition] = useTransition();

  const idempotencyKey = useMemo(() => crypto.randomUUID(), []);

  useEffect(() => {
    captureAttributionOnce();
  }, []);

  const showDraftBanner =
    !draftDismissed && !narrative && Boolean(restoredDraft?.narrative);

  function applyDraft() {
    if (!restoredDraft) return;
    setNarrative(restoredDraft.narrative);
    setFullName(restoredDraft.fullName || "");
    setPhone(restoredDraft.phone || "");
    setDraftDismissed(true);
  }

  function discardDraft() {
    clearDraft();
    setDraftDismissed(true);
  }

  useEffect(() => {
    if (!narrative) return;
    saveDraft({ narrative, contactMethod: CONTACT_METHOD, fullName, phone, email: "" });
  }, [narrative, fullName, phone, saveDraft]);

  function validateBeforeSubmit(): boolean {
    const errors: Partial<Record<string, string>> = {};
    if (narrative.trim().length < NARRATIVE_MIN_LENGTH) {
      errors.narrative = "Cuéntanos un poco más sobre lo que ocurrió para poder ayudarte.";
    }
    if (!phone.trim()) {
      errors.phone = "Ingresa tu WhatsApp para que podamos contactarte.";
    }
    if (!consent) {
      errors.consent = "Debes aceptar la Política de Privacidad para continuar.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validateBeforeSubmit()) return;

    const formData = new FormData();
    formData.set("narrative", narrative);
    formData.set("contactMethod", CONTACT_METHOD);
    formData.set("fullName", fullName);
    formData.set("phone", phone);
    formData.set("consent", consent ? "true" : "false");
    formData.set("website", honeypot);
    formData.set("idempotencyKey", idempotencyKey);

    const attribution = getStoredAttribution();
    if (attribution) {
      for (const [key, value] of Object.entries(attribution)) {
        formData.set(key, value);
      }
    }
    for (const file of files) formData.append("documents", file);

    startTransition(async () => {
      const response = await submitConsultation(formData);
      if (response.ok) {
        clearDraft();
        setResult(response);
      } else {
        setSubmitError(response.error);
        if (response.fieldErrors) setFieldErrors(response.fieldErrors);
      }
    });
  }

  if (result) {
    return <SubmissionConfirmation result={result} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot anti-spam: invisible para personas, visible para bots. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="website">No completar este campo</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {showDraftBanner && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-paper px-4 py-3 text-sm">
          <span className="text-ink-soft">Tienes un borrador guardado de una consulta anterior.</span>
          <span className="flex gap-3">
            <button type="button" onClick={applyDraft} className="font-medium text-brand hover:underline">
              Continuar borrador
            </button>
            <button type="button" onClick={discardDraft} className="text-muted hover:text-ink-soft">
              Descartar
            </button>
          </span>
        </div>
      )}

      <IntakeComposer
        narrative={narrative}
        onNarrativeChange={setNarrative}
        files={files}
        onFilesChange={setFiles}
        autoFocus
        narrativeError={fieldErrors.narrative}
        phone={phone}
        onPhoneChange={setPhone}
        phoneError={fieldErrors.phone}
        fullName={fullName}
        onFullNameChange={setFullName}
      />

      <PrivacyConsent checked={consent} onChange={setConsent} error={fieldErrors.consent} />

      {submitError && (
        <div
          role="alert"
          className="rounded-lg border border-urgency-critico/30 bg-urgency-critico/[0.06] px-4 py-3 text-sm text-urgency-critico"
        >
          {submitError}
        </div>
      )}

      <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "Enviando…" : "Enviar mi consulta"}
      </Button>
    </form>
  );
}
