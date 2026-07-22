-- =============================================================================
-- Plataforma jurídica digital — schema inicial
--
-- Principio de seguridad: los visitantes del sitio NUNCA hablan directo con
-- Supabase. El formulario público envía datos a un Server Action de Next.js,
-- que usa la service role key (solo en servidor) para insertar. Por eso estas
-- tablas NO tienen políticas RLS para "anon": el rol público no puede leer ni
-- escribir nada directamente. Solo usuarios autenticados con fila en
-- `profiles` (el equipo del despacho) pueden leer/gestionar vía el dashboard.
-- =============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Tipos enumerados
-- ---------------------------------------------------------------------------

create type user_role as enum ('admin', 'abogado', 'asistente', 'auditor');

create type consultation_status as enum (
  'nueva',
  'en_revision',
  'requiere_informacion',
  'contactar',
  'contactado',
  'consulta_agendada',
  'propuesta_enviada',
  'cliente',
  'no_viable',
  'archivada'
);

create type urgency_level as enum ('critico', 'alto', 'medio', 'bajo');

create type contact_method as enum ('whatsapp', 'llamada', 'email');

create type legal_area as enum (
  'penal', 'civil', 'familiar', 'laboral', 'administrativo',
  'constitucional', 'comercial', 'seguros', 'accidentes', 'transito',
  'responsabilidad_civil', 'deudas', 'contratos', 'sucesiones',
  'propiedad', 'empresas', 'otros'
);

-- ---------------------------------------------------------------------------
-- profiles — equipo del despacho (1:1 con auth.users). Se crea manualmente
-- o vía invitación de Supabase Auth; los clientes finales NUNCA tienen fila
-- aquí.
-- ---------------------------------------------------------------------------

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role user_role not null default 'asistente',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- contacts — datos de contacto de quien envía la consulta
-- ---------------------------------------------------------------------------

create table contacts (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  phone text,
  email text,
  preferred_method contact_method not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- consultations — núcleo del intake
-- ---------------------------------------------------------------------------

create table consultations (
  id uuid primary key default gen_random_uuid(),
  public_code text not null unique,
  contact_id uuid not null references contacts (id) on delete restrict,
  narrative text not null,
  status consultation_status not null default 'nueva',
  urgency urgency_level,
  urgency_source text,
  legal_area legal_area,
  legal_area_confirmed boolean not null default false,
  assigned_to uuid references profiles (id),
  idempotency_key text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index consultations_status_idx on consultations (status);
create index consultations_urgency_idx on consultations (urgency);
create index consultations_created_at_idx on consultations (created_at desc);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger consultations_set_updated_at
  before update on consultations
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- documents — metadata de archivos adjuntos (el binario vive en Storage)
-- ---------------------------------------------------------------------------

create table documents (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid not null references consultations (id) on delete cascade,
  storage_path text not null,
  original_filename text not null,
  mime_type text not null,
  size_bytes bigint not null,
  uploaded_at timestamptz not null default now()
);

create index documents_consultation_id_idx on documents (consultation_id);

-- ---------------------------------------------------------------------------
-- consent_records — evidencia de consentimiento (obligatorio antes de enviar)
-- ---------------------------------------------------------------------------

create table consent_records (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid not null references consultations (id) on delete cascade,
  consented boolean not null,
  consent_text_version text not null,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- marketing_attribution — UTM y origen del tráfico
-- ---------------------------------------------------------------------------

create table marketing_attribution (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid not null references consultations (id) on delete cascade,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer text,
  landing_page text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- ai_analyses — salidas versionadas del análisis preliminar asistido por IA
-- ---------------------------------------------------------------------------

create table ai_analyses (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid not null references consultations (id) on delete cascade,
  provider text not null,
  model text not null,
  prompt_version text not null,
  summary text,
  possible_areas jsonb,
  urgency_suggestion urgency_level,
  entities jsonb,
  missing_information jsonb,
  suggested_questions jsonb,
  red_flags jsonb,
  raw_output jsonb,
  created_at timestamptz not null default now()
);

create index ai_analyses_consultation_id_idx on ai_analyses (consultation_id);

-- ---------------------------------------------------------------------------
-- cases — expediente cuando una consulta se convierte en cliente (fase 2+)
-- ---------------------------------------------------------------------------

create table cases (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid references consultations (id),
  title text not null,
  status text not null default 'activo',
  responsible uuid references profiles (id),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- notes — notas internas del equipo sobre una consulta/caso
-- ---------------------------------------------------------------------------

create table notes (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid references consultations (id) on delete cascade,
  author_id uuid references profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- tasks — tareas de seguimiento
-- ---------------------------------------------------------------------------

create table tasks (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid references consultations (id) on delete cascade,
  assigned_to uuid references profiles (id),
  title text not null,
  due_at timestamptz,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- tags
-- ---------------------------------------------------------------------------

create table tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

create table consultation_tags (
  consultation_id uuid references consultations (id) on delete cascade,
  tag_id uuid references tags (id) on delete cascade,
  primary key (consultation_id, tag_id)
);

-- ---------------------------------------------------------------------------
-- communications — plantillas/envíos (fase 2: WhatsApp/email)
-- ---------------------------------------------------------------------------

create table communications (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid references consultations (id) on delete cascade,
  channel text not null,
  direction text not null,
  template text,
  body text,
  sent_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- appointments — agenda (fase 2)
-- ---------------------------------------------------------------------------

create table appointments (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid references consultations (id) on delete cascade,
  scheduled_at timestamptz,
  modality text,
  status text not null default 'programada',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- audit_logs — bitácora de acciones sensibles (nunca editable/borrable)
-- ---------------------------------------------------------------------------

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles (id),
  entity_type text not null,
  entity_id uuid,
  action text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index audit_logs_entity_idx on audit_logs (entity_type, entity_id);

-- =============================================================================
-- Row Level Security
--
-- Regla general: cualquier usuario autenticado con fila en `profiles` (equipo
-- del despacho) puede leer y gestionar. Los visitantes públicos (anon) no
-- tienen ninguna política: quedan bloqueados por defecto. Las escrituras
-- del formulario público pasan por el Server Action con la service role key,
-- que ignora RLS intencionalmente.
-- =============================================================================

alter table profiles enable row level security;
alter table contacts enable row level security;
alter table consultations enable row level security;
alter table documents enable row level security;
alter table consent_records enable row level security;
alter table marketing_attribution enable row level security;
alter table ai_analyses enable row level security;
alter table cases enable row level security;
alter table notes enable row level security;
alter table tasks enable row level security;
alter table tags enable row level security;
alter table consultation_tags enable row level security;
alter table communications enable row level security;
alter table appointments enable row level security;
alter table audit_logs enable row level security;

create policy "profiles_select_own" on profiles
  for select using (id = auth.uid());

create policy "staff_select_contacts" on contacts
  for select using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "staff_select_consultations" on consultations
  for select using (exists (select 1 from profiles p where p.id = auth.uid()));
create policy "staff_update_consultations" on consultations
  for update using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "staff_select_documents" on documents
  for select using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "staff_select_consent_records" on consent_records
  for select using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "staff_select_marketing_attribution" on marketing_attribution
  for select using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "staff_select_ai_analyses" on ai_analyses
  for select using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "staff_all_cases" on cases
  for all using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "staff_all_notes" on notes
  for all using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "staff_all_tasks" on tasks
  for all using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "staff_all_tags" on tags
  for all using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "staff_all_consultation_tags" on consultation_tags
  for all using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "staff_all_communications" on communications
  for all using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "staff_all_appointments" on appointments
  for all using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "staff_select_audit_logs" on audit_logs
  for select using (exists (select 1 from profiles p where p.id = auth.uid()));

-- =============================================================================
-- Storage — bucket privado para documentos adjuntos
-- =============================================================================

insert into storage.buckets (id, name, public)
values ('consultation-documents', 'consultation-documents', false)
on conflict (id) do nothing;

create policy "staff_read_documents_storage" on storage.objects
  for select using (
    bucket_id = 'consultation-documents'
    and exists (select 1 from profiles p where p.id = auth.uid())
  );
