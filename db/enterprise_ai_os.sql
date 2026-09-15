create extension if not exists pgcrypto;
create extension if not exists vector;

create table if not exists operator_runs (
  id uuid primary key default gen_random_uuid(),
  correlation_id text not null unique,
  actor text not null,
  objective text not null,
  region text not null,
  policy_version text not null,
  status text not null check (status in ('queued','running','approval_required','blocked','succeeded','failed','cancelled')),
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists operator_tasks (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references operator_runs(id) on delete cascade,
  parent_task_id uuid references operator_tasks(id),
  action_class text not null,
  module text not null,
  priority integer not null default 100,
  status text not null check (status in ('queued','scheduled','running','approval_required','blocked','succeeded','failed','cancelled')),
  requires_approval boolean not null default true,
  estimated_cost_eur numeric(12,2) not null default 0,
  retry_count integer not null default 0,
  max_retries integer not null default 2,
  due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists founder_memory (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  memory_type text not null check (memory_type in ('preference','decision','fact','constraint','evidence')),
  content text not null,
  embedding vector(1536),
  confidence text not null check (confidence in ('VERIFIED','DIRECTIONAL','UNVERIFIED','BLOCKED')),
  source_ref text,
  approved_by text,
  approved_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists founder_memory_embedding_idx on founder_memory using hnsw (embedding vector_cosine_ops);
create index if not exists founder_memory_scope_idx on founder_memory (tenant_id, memory_type, confidence);

create table if not exists approvals (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references operator_tasks(id) on delete cascade,
  action_fingerprint text not null,
  requested_by text not null,
  approved_by text,
  status text not null check (status in ('pending','approved','rejected','expired')) default 'pending',
  budget_eur numeric(12,2) not null default 0,
  expires_at timestamptz,
  decision_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists approvals_fingerprint_pending_idx on approvals (action_fingerprint) where status = 'pending';

create table if not exists evidence (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references operator_runs(id) on delete set null,
  evidence_type text not null,
  confidence text not null check (confidence in ('VERIFIED','DIRECTIONAL','UNVERIFIED','BLOCKED')),
  source_ref text not null,
  content_hash text,
  observed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists audit_events (
  id bigint generated always as identity primary key,
  event_name text not null,
  run_id uuid references operator_runs(id) on delete set null,
  task_id uuid references operator_tasks(id) on delete set null,
  actor text not null,
  module text not null,
  action_class text not null,
  region text not null,
  outcome text not null,
  cost_eur numeric(12,2) not null default 0,
  duration_ms integer,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_events_run_idx on audit_events (run_id, created_at desc);
create index if not exists audit_events_region_idx on audit_events (region, created_at desc);

create table if not exists commerce_events (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references operator_runs(id) on delete set null,
  provider text not null,
  provider_event_id text not null unique,
  event_type text not null,
  amount_minor bigint not null default 0,
  currency text not null default 'EUR',
  status text not null,
  receipt_ref text,
  created_at timestamptz not null default now()
);

create table if not exists robotics_tasks (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references operator_runs(id) on delete set null,
  robot_id text not null,
  task_type text not null,
  status text not null check (status in ('planned','safety_check','reserved','executing','verified','cancelled','safe_stopped','failed')),
  safety_state text not null check (safety_state in ('nominal','degraded','stop_required','emergency_stop')),
  heartbeat_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists region_policy_events (
  id bigint generated always as identity primary key,
  region text not null,
  policy_version text not null,
  event_type text not null,
  allowed boolean not null,
  reason text not null,
  created_at timestamptz not null default now()
);
