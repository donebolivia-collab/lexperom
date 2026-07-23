/**
 * Configuración central de marca y contacto.
 *
 * Todo el nombre comercial, contacto y datos profesionales viven aquí.
 * Ningún otro archivo debe tener el nombre de la marca escrito literalmente:
 * siempre importar desde este módulo. Así el nombre, dominio, logo y datos
 * reales se pueden reemplazar el día que estén definidos sin tocar el resto
 * del código.
 *
 * Los valores marcados con [PLACEHOLDER] son inventados/de relleno y deben
 * reemplazarse por datos reales antes de producción. No se han inventado
 * matrículas, testimonios, estadísticas ni premios.
 */

export const siteConfig = {
  /** Nombre comercial: Lexperom, de "Lex perfugium omnibus". */
  siteName: "Lexperom",

  /** Razón social / nombre legal, si difiere del comercial. Pendiente registro. */
  legalName: "[NOMBRE_LEGAL_PENDIENTE]",

  /** Descripción corta usada en metadata y compartidos sociales. */
  tagline: "Cuéntanos qué ocurrió. Nosotros lo organizamos para revisión profesional.",

  description:
    "Describe tu problema legal con tus propias palabras. Un abogado revisa tu consulta y te contacta por el medio que prefieras.",

  /**
   * Dominio de producción. Placeholder hasta definir dominio final.
   * Debe ser una URL sintácticamente válida (se usa en metadataBase),
   * por eso no lleva corchetes como el resto de placeholders del archivo.
   */
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dominio-pendiente.example.com",

  /** Rutas de logo/favicon. Reemplazar archivos en /public cuando existan. */
  logo: {
    icon: "/favicon.ico",
    wordmarkText: "Lexperom",
  },

  /**
   * Datos de contacto público. WhatsApp/teléfono son reales (mismo número
   * para ambos). Correo, dirección y ciudad siguen como placeholders
   * explícitos hasta contar con datos reales — no inventar.
   */
  contact: {
    whatsapp: "67725694",
    phone: "67725694",
    countryCode: "591",
    email: "[EMAIL_PENDIENTE]",
    address: "[DIRECCION_PENDIENTE]",
    city: "[CIUDAD_PENDIENTE]",
    country: "Bolivia",
  },

  /** Perfil profesional público. Placeholders hasta contar con datos reales. */
  professional: {
    name: "[NOMBRE_PROFESIONAL_PENDIENTE]",
    credentials: "[CREDENCIALES_PENDIENTE]",
    barNumber: "[MATRICULA_PENDIENTE]",
    baseCity: "[CIUDAD_BASE_PENDIENTE]",
    photoUrl: "[FOTO_PROFESIONAL_PENDIENTE]",
  },

  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
  },

  /** Áreas orientativas mostradas en home (no exigen selección del usuario). */
  practiceAreas: [
    "Accidentes",
    "Seguros",
    "Penal",
    "Civil",
    "Familia",
    "Laboral",
    "Contratos",
    "Deudas",
    "Empresas",
    "Otros",
  ],

  /** Analytics — se activan solo si la variable de entorno está presente. */
  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
    tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
