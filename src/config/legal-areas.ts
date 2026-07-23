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
}

/**
 * Áreas orientativas con descripción corta, para la página de
 * "Soluciones Legales". Puramente informativas — el usuario nunca tiene
 * que elegir una para poder enviar su consulta.
 */
export const legalAreas: LegalArea[] = [
  {
    name: "Accidentes",
    description: "Accidentes de tránsito, laborales y reclamos por daños.",
    icon: Car,
  },
  {
    name: "Seguros",
    description: "Reclamos a aseguradoras, coberturas y siniestros.",
    icon: ShieldCheck,
  },
  {
    name: "Penal",
    description: "Denuncias, procesos penales y defensa legal.",
    icon: Gavel,
  },
  {
    name: "Civil",
    description: "Conflictos civiles, contratos y responsabilidad civil.",
    icon: Scale,
  },
  {
    name: "Familia",
    description: "Divorcios, pensiones, tutelas y régimen familiar.",
    icon: Users,
  },
  {
    name: "Laboral",
    description: "Despidos, beneficios sociales y conflictos laborales.",
    icon: Briefcase,
  },
  {
    name: "Contratos",
    description: "Redacción, revisión y disputas contractuales.",
    icon: FileText,
  },
  {
    name: "Deudas",
    description: "Cobros, refinanciamiento y procesos por deudas.",
    icon: CreditCard,
  },
  {
    name: "Empresas",
    description: "Constitución, gestión legal y trámites empresariales.",
    icon: Building2,
  },
  {
    name: "Otros",
    description: "¿No encuentras tu caso aquí? Cuéntanoslo igual.",
    icon: HelpCircle,
  },
];
