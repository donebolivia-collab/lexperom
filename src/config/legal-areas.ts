import {
  Car,
  ShieldCheck,
  Gavel,
  Scale,
  Users,
  Briefcase,
  FileText,
  CreditCard,
  Building2,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

export interface LegalArea {
  name: string;
  description: string;
  icon: LucideIcon;
  /** Si existe, hay página de detalle en /servicios/[slug]. "Otros" no tiene. */
  slug?: string;
  /** Párrafo introductorio de la página de detalle. */
  longDescription?: string;
  /** Situaciones comunes que entran en esta área, para la página de detalle. */
  commonSituations?: string[];
}

/**
 * Áreas orientativas con descripción corta, para la página de
 * "Nuestros Servicios". Puramente informativas — el usuario nunca tiene
 * que elegir una para poder enviar su consulta; el formulario sigue sin
 * pedir clasificación. Las páginas de detalle son solo para quien navega
 * el sitio buscando información antes de escribir.
 */
export const legalAreas: LegalArea[] = [
  {
    name: "Accidentes",
    description: "Accidentes de tránsito, laborales y reclamos por daños.",
    icon: Car,
    slug: "accidentes",
    longDescription:
      "Cubrimos casos derivados de accidentes de tránsito, laborales o cualquier situación donde alguien resulte con daños por la negligencia de otra persona o institución. El objetivo es que la responsabilidad quede establecida y que el daño sufrido sea reparado.",
    commonSituations: [
      "Choque de tránsito donde otra persona tiene responsabilidad",
      "Atropello a peatón o ciclista",
      "Accidente ocurrido en el trabajo",
      "Daños materiales por negligencia de terceros",
      "Reclamo de indemnización por lesiones",
    ],
  },
  {
    name: "Seguros",
    description: "Reclamos a aseguradoras, coberturas y siniestros.",
    icon: ShieldCheck,
    slug: "seguros",
    longDescription:
      "Ayudamos cuando una aseguradora se niega a pagar un siniestro, ofrece un monto menor al que corresponde, o simplemente no responde a tiempo. Revisamos tu póliza y el siniestro para saber si el reclamo tiene sustento.",
    commonSituations: [
      "Aseguradora que rechaza o demora el pago de un siniestro",
      "Monto de indemnización que parece menor al que corresponde",
      "Seguro vehicular, de salud o de vida",
      "Interpretación de cláusulas o exclusiones de la póliza",
    ],
  },
  {
    name: "Penal",
    description: "Denuncias, procesos penales y defensa legal.",
    icon: Gavel,
    slug: "penal",
    longDescription:
      "Ya sea que hayas recibido una denuncia, estés involucrado en un proceso penal, o necesites orientación antes de declarar ante la Fiscalía, contar con defensa técnica desde el primer momento cambia el resultado de un caso.",
    commonSituations: [
      "Denuncia recibida o que estás por presentar",
      "Citación o proceso penal en curso",
      "Necesidad de asesoría antes de una declaración",
      "Defensa técnica en audiencias",
    ],
  },
  {
    name: "Civil",
    description: "Conflictos civiles, contratos y responsabilidad civil.",
    icon: Scale,
    slug: "civil",
    longDescription:
      "El área civil cubre conflictos entre personas o empresas que no llegan a lo penal: incumplimientos, daños, disputas de propiedad y todo lo que necesite resolverse por la vía civil.",
    commonSituations: [
      "Incumplimiento de un contrato",
      "Daños y perjuicios causados por otra persona",
      "Conflictos de propiedad o vecindad",
      "Responsabilidad civil por daños",
    ],
  },
  {
    name: "Familia",
    description: "Divorcios, pensiones, tutelas y régimen familiar.",
    icon: Users,
    slug: "familia",
    longDescription:
      "Acompañamos procesos familiares con la sensibilidad que requieren, buscando siempre la solución más rápida y menos desgastante para todas las partes, especialmente cuando hay hijos de por medio.",
    commonSituations: [
      "Divorcio de mutuo acuerdo o contencioso",
      "Pensión de asistencia familiar",
      "Tenencia y régimen de visitas de hijos",
      "Reconocimiento de uniones libres",
    ],
  },
  {
    name: "Laboral",
    description: "Despidos, beneficios sociales y conflictos laborales.",
    icon: Briefcase,
    slug: "laboral",
    longDescription:
      "Si algo no está saliendo bien en tu relación laboral (te despidieron sin causa justificada, no te pagaron lo que corresponde, o hay un conflicto con tu empleador), esta es el área que revisa tu caso.",
    commonSituations: [
      "Despido injustificado",
      "Falta de pago de beneficios sociales (indemnización, aguinaldo, vacaciones)",
      "Cálculo de finiquito",
      "Acoso laboral",
    ],
  },
  {
    name: "Contratos",
    description: "Redacción, revisión y disputas contractuales.",
    icon: FileText,
    slug: "contratos",
    longDescription:
      "Ya sea que necesites redactar un contrato desde cero, que alguien te haya pasado uno para firmar, o que ya exista una disputa sobre lo que se firmó, revisamos el documento con el mismo cuidado en todos los casos.",
    commonSituations: [
      "Redacción de contratos de alquiler, compraventa o servicios",
      "Revisión de un contrato antes de firmarlo",
      "Incumplimiento de cláusulas ya pactadas",
      "Modificación o terminación de un contrato vigente",
    ],
  },
  {
    name: "Deudas",
    description: "Cobros, refinanciamiento y procesos por deudas.",
    icon: CreditCard,
    slug: "deudas",
    longDescription:
      "Ya sea que te deban dinero y necesites cobrarlo, o que tú tengas una deuda y busques cómo negociarla, esta área cubre ambos lados del problema.",
    commonSituations: [
      "Cobro de deudas pendientes a terceros",
      "Negociación con acreedores",
      "Procesos de refinanciamiento",
      "Notificaciones o demandas de cobranza",
    ],
  },
  {
    name: "Empresas",
    description: "Constitución, gestión legal y trámites empresariales.",
    icon: Building2,
    slug: "empresas",
    longDescription:
      "Desde constituir una empresa por primera vez hasta mantener al día su parte legal mientras crece, acompañamos negocios en cada etapa, sin la complejidad de un despacho corporativo tradicional.",
    commonSituations: [
      "Constitución de una empresa",
      "Trámites ante Fundempresa y otras entidades",
      "Redacción y revisión de contratos comerciales",
      "Asesoría legal continua para el negocio",
    ],
  },
  {
    name: "Otros",
    description: "¿No encuentras tu caso aquí? Cuéntanoslo igual.",
    icon: HelpCircle,
  },
];
