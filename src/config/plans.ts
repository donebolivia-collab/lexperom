/**
 * Planes de membresía de protección legal.
 *
 * Precios y beneficios de referencia, diseñados combinando modelos reales
 * de protección legal prepagada (LegalShield, ARAG, Legálitas, Lidiare) y
 * el modelo de membresías de Centeno Abogados, adaptados al contexto
 * boliviano. NO son precios definitivos — son un punto de partida
 * razonable pensado para ser accesible; ajustar libremente aquí sin tocar
 * el resto del código.
 *
 * Importante: esto es una membresía de acceso a servicios legales, no un
 * seguro. No cubre tasas, aranceles, notariado ni otros costos de
 * terceros — eso se aclara en la propia página.
 */

export interface LegalPlan {
  id: string;
  name: string;
  priceBs: number;
  highlight?: boolean;
  tagline: string;
  features: string[];
}

export const legalPlans: LegalPlan[] = [
  {
    id: "esencial",
    name: "Esencial",
    priceBs: 69,
    tagline: "Para resolver dudas legales antes de que se conviertan en problemas.",
    features: [
      "Consultas ilimitadas por WhatsApp o correo",
      "Respuesta en menos de 48 horas hábiles",
      "Revisión de 1 documento al mes (contrato, carta, notificación)",
      "Acceso a guías y modelos de documentos básicos",
      "Para 1 persona",
    ],
  },
  {
    id: "familiar",
    name: "Familiar",
    priceBs: 179,
    highlight: true,
    tagline: "Para proteger a tu familia, no solo a ti.",
    features: [
      "Todo lo del plan Esencial",
      "Cobertura para hasta 4 miembros de tu familia",
      "Respuesta prioritaria en 24 horas",
      "Hasta 3 documentos revisados o redactados al mes",
      "Acompañamiento en 1 trámite administrativo al mes",
      "Descuento preferencial si necesitas representación formal",
    ],
  },
  {
    id: "integral",
    name: "Integral",
    priceBs: 419,
    tagline: "Protección legal constante — para personas y pequeños negocios.",
    features: [
      "Todo lo del plan Familiar",
      "Respuesta el mismo día para consultas urgentes",
      "Documentos revisados o redactados ilimitados",
      "Acompañamiento ilimitado en trámites y diligencias",
      "Horas de representación legal incluidas cada mes",
      "Prioridad de agenda con tu abogado",
    ],
  },
];
