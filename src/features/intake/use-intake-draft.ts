"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { INTAKE_DRAFT_STORAGE_KEY, type IntakeDraft } from "@/types/intake";

const AUTOSAVE_DEBOUNCE_MS = 500;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string | null {
  return window.localStorage.getItem(INTAKE_DRAFT_STORAGE_KEY);
}

function getServerSnapshot(): string | null {
  return null;
}

/**
 * Autoguarda el borrador del relato en localStorage para que no se pierda
 * si el usuario recarga la página o el envío falla por conexión.
 *
 * Usa useSyncExternalStore (en vez de useState+useEffect) para leer el
 * borrador existente: es la forma correcta y SSR-segura de sincronizar
 * estado de React con un almacén externo, sin necesidad de un efecto que
 * dispare un setState en el montaje.
 */
export function useIntakeDraft() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  let restoredDraft: IntakeDraft | null = null;
  if (raw) {
    try {
      restoredDraft = JSON.parse(raw) as IntakeDraft;
    } catch {
      restoredDraft = null;
    }
  }

  const saveDraft = useCallback((draft: Omit<IntakeDraft, "savedAt">) => {
    if (typeof window === "undefined") return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      window.localStorage.setItem(
        INTAKE_DRAFT_STORAGE_KEY,
        JSON.stringify({ ...draft, savedAt: Date.now() })
      );
    }, AUTOSAVE_DEBOUNCE_MS);
  }, []);

  const clearDraft = useCallback(() => {
    if (typeof window === "undefined") return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    window.localStorage.removeItem(INTAKE_DRAFT_STORAGE_KEY);
  }, []);

  return { restoredDraft, saveDraft, clearDraft };
}
