import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseOrigin = supabaseUrl ? new URL(supabaseUrl).origin : "";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  // 'unsafe-inline' es necesario porque Next.js App Router entrega el
  // payload de Server Components al cliente vía <script> inline
  // (self.__next_f.push(...)); sin esto, React nunca hidrata y el sitio
  // queda no interactivo. Un CSP con nonce por request evitaría esto, pero
  // requiere Proxy/middleware — que en Next.js 16 solo corre en runtime
  // Node.js, incompatible con el despliegue en Cloudflare Workers. No hay
  // dangerouslySetInnerHTML con contenido de usuario en el sitio (solo el
  // JSON-LD, con datos controlados por el servidor), así que el riesgo
  // real de este trade-off es bajo.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${supabaseOrigin ? ` ${supabaseOrigin}` : ""}`,
  "font-src 'self' data:",
  `connect-src 'self'${supabaseOrigin ? ` ${supabaseOrigin}` : ""}`,
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // CSP y HSTS solo en producción: el runtime de desarrollo de Next
  // (Turbopack/Fast Refresh) necesita eval() y scripts inline que una CSP
  // estricta bloquea, lo que impide que React hidrate en `next dev`.
  ...(isProduction
    ? [
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "Content-Security-Policy", value: csp },
      ]
    : []),
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
