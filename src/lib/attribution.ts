"use client";

/**
 * Captura UTM/origen en el primer render de la sesión y lo guarda en
 * sessionStorage para adjuntarlo al enviar la consulta, sin depender de
 * cookies de terceros ni de un backend externo.
 */

const STORAGE_KEY = "legal-intake-attribution:v1";

export interface AttributionSnapshot {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  referrer: string;
  landing_page: string;
  timestamp: string;
}

export function captureAttributionOnce(): void {
  if (typeof window === "undefined") return;
  if (window.sessionStorage.getItem(STORAGE_KEY)) return;

  const params = new URLSearchParams(window.location.search);
  const snapshot: AttributionSnapshot = {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_term: params.get("utm_term") ?? "",
    referrer: document.referrer ?? "",
    landing_page: window.location.pathname + window.location.search,
    timestamp: new Date().toISOString(),
  };

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export function getStoredAttribution(): AttributionSnapshot | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AttributionSnapshot;
  } catch {
    return null;
  }
}
