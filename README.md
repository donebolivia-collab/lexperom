# Lexperom — Plataforma jurídica digital

Plataforma de intake legal: un visitante cuenta su problema con sus propias
palabras, adjunta documentos si quiere, deja su contacto, y el equipo del
despacho revisa la consulta desde un panel privado con apoyo de un análisis
preliminar por IA.

El nombre comercial es **Lexperom** ("Lex perfugium omnibus"). El logo,
color de marca definitivo y datos de contacto reales **todavía se están
definiendo** — todo vive centralizado en
[`src/config/site.ts`](src/config/site.ts) (nombre) y
[`src/app/globals.css`](src/app/globals.css) (color) como placeholders
fáciles de reemplazar sin tocar el resto del código.

## Stack

- **Next.js 16** (App Router, Server Actions, TypeScript strict)
- **Tailwind CSS v4**
- **Supabase** (Postgres + Auth + Storage privado)
- **Zod** para validación cliente/servidor
- **Gemini** (capa gratuita) como proveedor de IA por defecto, detrás de una
  interfaz intercambiable (`src/lib/ai`)

## Puesta en marcha

### 1. Variables de entorno

```bash
cp .env.example .env.local
```

Completa con tus credenciales reales de Supabase (Project Settings → API) y,
opcionalmente, una API key gratuita de Gemini
(https://aistudio.google.com/apikey). **Sin `GEMINI_API_KEY` el sistema sigue
funcionando de extremo a extremo**: usa un análisis por reglas como
respaldo en vez de fallar.

`SUPABASE_SERVICE_ROLE_KEY` es secreta — solo se usa en servidor (Server
Actions) y nunca debe llevar el prefijo `NEXT_PUBLIC_`.

### 2. Base de datos

Aplica la migración en tu proyecto Supabase (SQL Editor o Supabase CLI):

```
supabase/migrations/0001_init.sql
```

Esto crea todas las tablas, políticas RLS y el bucket privado de Storage
(`consultation-documents`).

### 3. Crear el primer usuario del equipo

El intake público **no** crea usuarios. Los miembros del despacho se crean
manualmente:

1. Supabase Dashboard → Authentication → Add user (o invitar por email).
2. Insertar su fila correspondiente en `profiles`:

```sql
insert into profiles (id, full_name, role)
values ('<uuid-del-usuario-creado>', 'Nombre Apellido', 'admin');
```

Sin fila en `profiles`, el usuario puede autenticarse pero no ve nada en el
dashboard (las políticas RLS lo bloquean).

### 4. Instalar y correr

```bash
npm install
npm run dev
```

Sitio público: `http://localhost:3000`
Panel privado: `http://localhost:3000/admin/login`

## Arquitectura

```
src/
  app/                    rutas (App Router)
    (marketing)/          sitio público: home, cómo funciona, privacidad...
    admin/                panel privado (login + dashboard protegido)
  components/ui/          primitivas de UI (Button, Input, Card...)
  components/layout/      header, footer, sidebar del panel
  features/
    intake/                formulario progresivo + Server Action de envío
    consultations/          UI y acciones del panel (estados, notas, IA)
    home/                   secciones de la landing
    auth/                   login/logout, perfil actual
  lib/
    supabase/               clientes browser / server (RLS) / admin (service role)
    ai/                     capa de IA desacoplada (proveedor intercambiable)
    rate-limit.ts, sanitize-filename.ts, public-code.ts, attribution.ts
  validators/               esquemas Zod (autoridad final en servidor)
  types/                    tipos de dominio
  config/site.ts             branding y contacto centralizados
supabase/migrations/         schema SQL + RLS + storage bucket
```

### Principio de seguridad del intake

Los visitantes **nunca** hablan directo con Supabase. El formulario público
envía datos a un Server Action (`src/features/intake/actions.ts`), que usa
la *service role key* (solo en servidor) para escribir. Por eso las tablas
no tienen políticas RLS para el rol `anon`: queda bloqueado por defecto. Solo
usuarios autenticados con fila en `profiles` pueden leer/gestionar desde el
panel.

### Capa de IA

`src/lib/ai/index.ts` expone funciones granulares
(`summarizeConsultation`, `classifyLegalArea`, `detectUrgency`,
`extractEntities`, `identifyMissingInformation`,
`suggestFollowUpQuestions`) que hoy comparten una sola llamada eficiente al
proveedor (`runPreliminaryAnalysis`). Cambiar de proveedor (Gemini → Claude,
OpenAI, etc.) significa escribir una clase que implemente `AIProvider`
(`src/lib/ai/provider.ts`) y seleccionarla en `resolveProvider()` — nada más
del sistema cambia.

La salida del modelo nunca se confía directamente: siempre se valida con Zod
(`src/lib/ai/schema.ts`) antes de tocar la base de datos. Las instrucciones
de sistema están separadas del relato del usuario para mitigar prompt
injection (ver comentarios en `src/lib/ai/providers/gemini.ts`).

## Qué falta a propósito (no implementado, por diseño de MVP)

Marcado explícitamente como "Próximamente" en el sidebar del panel — visible
para mostrar hacia dónde escala el producto, pero deshabilitado porque no
está implementado:

- OCR y análisis de documentos adjuntos
- WhatsApp Business API / envío de plantillas
- Agenda / citas
- Portal del cliente
- Pagos y firma electrónica
- CRM avanzado (tags, casos, drag & drop de pipeline)
- Conflict check

Ver el prompt maestro original para el roadmap completo por fases.

## Seguridad implementada en este MVP

- RLS en todas las tablas; el rol público no puede leer ni escribir nada
- Rate limiting básico por IP en el envío del formulario (en memoria — migrar
  a Vercel KV/Upstash si el tráfico lo justifica)
- Honeypot anti-bot en el formulario
- Validación de tipo MIME y tamaño de archivos, sanitización de nombres
- Storage privado con URLs firmadas de corta duración (10 min) en el panel
- Headers de seguridad (CSP, HSTS, X-Frame-Options, etc.) en `next.config.ts`
- Idempotencia en el envío del formulario (evita duplicados por doble clic o
  reintento de red)
- Autoguardado local del relato para no perderlo ante error de red

## Pendiente antes de producción

- Reemplazar todos los placeholders de `src/config/site.ts` con datos reales
- Revisión legal real de `/privacidad` y `/terminos` (están marcados en la
  propia página como pendientes de revisión)
- Definir dominio final y actualizar `NEXT_PUBLIC_SITE_URL`
- Analytics: agregar `NEXT_PUBLIC_GA4_ID` / píxeles cuando existan cuentas

## Despliegue

Objetivo: Vercel (frontend/servidor) + Supabase (base de datos/auth/storage).

1. Conectar el repositorio a Vercel.
2. Configurar las mismas variables de `.env.example` en Vercel (Project
   Settings → Environment Variables).
3. Aplicar `supabase/migrations/0001_init.sql` en el proyecto Supabase de
   producción antes del primer deploy.
