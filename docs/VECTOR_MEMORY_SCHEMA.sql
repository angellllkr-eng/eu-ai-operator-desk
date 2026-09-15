create extension if not exists vector;

create table if not exists operator_memory (
  memory_id uuid primary key default gen_random_uuid(),
  namespace text not null,
  subject text not null,
  content text not null,
  embedding vector(1536),
  source_uri text,
  source_hash text,
  confidence text not null check (confidence in ('VERIFIED','CORROBORATED','DIRECTIONAL','UNVERIFIED','BLOCKED')),
  owner_scope text not null default 'founder',
  region text not null default 'EU',
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists operator_memory_namespace_idx on operator_memory(namespace);
create index if not exists operator_memory_subject_idx on operator_memory(subject);
create index if not exists operator_memory_region_idx on operator_memory(region);
create index if not exists operator_memory_confidence_idx on operator_memory(confidence);

create index if not exists operator_memory_embedding_idx
  on operator_memory using hnsw (embedding vector_cosine_ops)
  where embedding is not null;

create table if not exists operator_memory_events (
  event_id uuid primary key default gen_random_uuid(),
  memory_id uuid not null references operator_memory(memory_id) on delete cascade,
  event_type text not null,
  actor text not null,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists operator_memory_events_memory_idx on operator_memory_events(memory_id, created_at desc);
