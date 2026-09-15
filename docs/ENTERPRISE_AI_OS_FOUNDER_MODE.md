# Enterprise AI OS — Founder Mode

Status: BUILD-READY / CONTROLLED EXECUTION
Owner: A.K.
Canonical public surface: EU AI Operator's Desk
Execution/control plane: MindReply / MRdash

## 1. Operating contract

The system runs as one orchestrated control loop:

`Memory → Planner → Scheduler → Execution → Analytics → Memory`

The Desk is the intelligence and qualification surface. MindReply is the execution and owner-control plane. No recommendation becomes an external or irreversible action without policy approval.

### Non-negotiable rules

1. Secrets remain server-side and are never committed.
2. Every external action has an actor, policy decision, timestamp, correlation ID and outcome.
3. Autonomous execution is bounded by budget, scope, region and action class.
4. Purchases, memberships, financial commitments, deployments and destructive actions require explicit approval unless a previously approved policy covers the exact action class and budget.
5. Robotics defaults to safe-stop on communication loss, policy violation, localization loss or emergency stop.
6. Evidence is typed `VERIFIED`, `DIRECTIONAL`, `UNVERIFIED`, or `BLOCKED`.
7. Public research and private founder memory are separate tenants and access domains.
8. A failed verification never becomes a successful state through inference.

## 2. System map

```text
                         ┌─────────────────────────────┐
                         │        Founder Cockpit      │
                         │ decisions · budgets · live  │
                         └──────────────┬──────────────┘
                                        │
                              approval / policy
                                        │
                         ┌──────────────▼──────────────┐
                         │       MindReply Control      │
                         │ identity · policy · actions │
                         └───────┬─────────┬────────────┘
                                 │         │
                    ┌────────────▼─┐   ┌──▼────────────────┐
                    │  AI Operator │   │ MCP Tool Gateway  │
                    │     Desk     │   │ APIs · commerce   │
                    └──────┬───────┘   └──┬────────────────┘
                           │              │
                  evidence / plans       │
                           │              │
                 ┌─────────▼──────────────▼─────────┐
                 │         Operational Data          │
                 │ Postgres · vectors · audit log   │
                 └───────┬──────────┬─────────┬──────┘
                         │          │         │
                    analytics    memory    scheduler
                         │          │         │
                         └──────────▼─────────┘
                                  loop

         ┌──────────────────────── Physical / Regional Edge ─────────────────────┐
         │ Cloud Run · Cloudflare · robotics gateways · regional policy domains │
         └───────────────────────────────────────────────────────────────────────┘
```

## 3. Module contracts

| Module | Owns | Reads | Writes | Escalates when |
|---|---|---|---|---|
| Orchestrator | run state, delegation, policy gates | all module state | run events | dependency failure or policy conflict |
| Memory | founder preferences, durable context, evidence links | approved records | memory records | conflicting owner preference |
| Planner | goals, workflows, dependencies | memory + evidence | plans/tasks | missing evidence or unsafe action |
| Scheduler | due work, retries, cadence | tasks + policies | schedule events | retry budget exceeded |
| Analytics | KPIs, anomalies, health | events + outcomes | metrics/alerts | threshold breach |
| MCP Tools | external tool contracts | approved action | tool results | auth/scope/payment failure |
| Shopping/Memberships | product/service discovery and bounded purchase workflows | catalog + approved budget | cart/order/membership events | price change, policy mismatch, purchase approval |
| Robotics | physical task plans and safety state | approved task + telemetry | robot commands/events | E-stop, safety fault, localization fault |
| Multi-region | jurisdiction, residency, routing | region policy | deployment/routing events | residency or policy conflict |

## 4. Closed-loop execution

1. Memory supplies only approved durable context.
2. Planner converts an objective into typed tasks.
3. Scheduler assigns execution windows and retry budgets.
4. Execution performs only policy-permitted actions.
5. Analytics compares expected vs actual outcome.
6. Memory records verified results and unresolved blockers.
7. Planner re-plans only from the updated state.

Every loop has a `run_id`, `correlation_id`, `policy_version`, `region`, `actor`, `started_at`, `completed_at`, and `outcome`.

## 5. Cloud Run service contract

Target service: `eu-ai-operator-control`

Region: `europe-west1`

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: eu-ai-operator-control
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/minScale: "0"
        autoscaling.knative.dev/maxScale: "10"
        run.googleapis.com/execution-environment: gen2
    spec:
      serviceAccountName: eu-ai-operator-control@PROJECT_ID.iam.gserviceaccount.com
      containerConcurrency: 40
      timeoutSeconds: 300
      containers:
        - image: REGION-docker.pkg.dev/PROJECT_ID/eu-ai/operator-control:stable
          ports:
            - containerPort: 8080
          env:
            - name: NODE_ENV
              value: production
            - name: REGION
              value: europe-west1
            - name: CONTROL_PLANE_MODE
              value: approval_required
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: eu-ai-operator-database-url
                  key: latest
            - name: MINDREPLY_CONTROL_URL
              value: https://mind-reply.com
```

Production deployment must use a real project, service account and Secret Manager binding supplied at deployment time; no credentials belong in Git.

## 6. API Gateway contract

External API base: `/api/v1`

Required headers: `Authorization`, `X-Correlation-Id`, `X-Actor-Id`.

Core endpoints:

| Method | Route | Purpose | Approval |
|---|---|---|---|
| GET | `/health` | liveness/readiness | no |
| POST | `/runs` | create controlled run | no |
| GET | `/runs/{runId}` | inspect run | no |
| POST | `/plans` | create plan | no |
| POST | `/handoffs/mindreply` | create execution handoff | yes if actionful |
| POST | `/approvals/{id}/approve` | approve exact action | founder/operator |
| POST | `/approvals/{id}/reject` | reject action | founder/operator |
| GET | `/evidence/{id}` | retrieve evidence | policy |
| POST | `/mcp/invoke` | invoke approved MCP tool | policy |
| POST | `/commerce/quote` | price/quote lookup | no |
| POST | `/commerce/purchase` | purchase | exact approval required |
| POST | `/robotics/tasks` | create physical task | safety + approval |
| POST | `/robotics/stop` | emergency stop | immediate |

## 7. Vector memory schema

Use Postgres + pgvector as the default durable memory store.

```sql
create extension if not exists vector;

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

create index if not exists founder_memory_embedding_idx
  on founder_memory using hnsw (embedding vector_cosine_ops);

create index if not exists founder_memory_tenant_idx
  on founder_memory (tenant_id, memory_type, confidence);
```

Memory retrieval must filter by tenant before vector similarity. Expired or blocked records are excluded from execution context.

## 8. Scheduler logic

```text
on schedule_tick:
  load approved policies
  load due tasks ordered by priority and dependency readiness
  for task in due_tasks:
    if task.region is not policy.allowed_region: escalate
    if task.action_class is not policy.allowed_action_class: escalate
    if task.estimated_cost > policy.remaining_budget: escalate
    if task.requires_approval and no matching approval: queue
    else dispatch(task)

on result:
  record execution event
  update task state
  update budget ledger
  emit analytics event
  persist verified evidence
  if retryable_failure and retry_count < policy.max_retries: reschedule
  else if failure: escalate
```

## 9. MCP integration contract

MCP tools are treated as typed capabilities, never unrestricted agent powers.

```json
{
  "tool": "mindreply.handoff.create",
  "version": "1.0",
  "actor": "founder-agent",
  "scope": ["handoff:create"],
  "input": {
    "title": "EU deployment readiness assessment",
    "source_run_id": "run_01HZZZZZZZZZZZZZZZZZZZZZZZ",
    "evidence_ids": ["ev_01HZZZZZZZZZZZZZZZZZZZZZZZ"],
    "requested_action": "create_work_item",
    "region": "eu-bg",
    "budget_eur": 0
  },
  "policy": {
    "approval_required": true,
    "max_budget_eur": 0
  }
}
```

Response contract:

```json
{
  "status": "approval_required",
  "approval_id": "apr_01HZZZZZZZZZZZZZZZZZZZZZZZ",
  "correlation_id": "cor_01HZZZZZZZZZZZZZZZZZZZZZZZ",
  "receipt": null
}
```

## 10. Robotics integration

Robotics remains physically constrained and fail-safe.

Task flow:

`Plan → Safety Check → Reservation → Execute → Telemetry → Verify → Release`

Safety gates:

- hardware E-stop is authoritative
- loss of heartbeat triggers safe-stop
- localization confidence below configured threshold triggers safe-stop
- collision/safety sensor fault triggers safe-stop
- command outside task envelope is rejected
- remote operator can always stop the task
- no financial action is coupled directly to physical motion

ROS2 command interface:

```text
/eu_ai_operator/task/submit
/eu_ai_operator/task/cancel
/eu_ai_operator/safety/stop
/eu_ai_operator/telemetry/state
/eu_ai_operator/telemetry/health
```

gRPC service surface:

```proto
service RoboticsControl {
  rpc SubmitTask(TaskRequest) returns (TaskReceipt);
  rpc CancelTask(TaskCancelRequest) returns (TaskReceipt);
  rpc EmergencyStop(EmergencyStopRequest) returns (SafetyReceipt);
  rpc GetState(StateRequest) returns (RobotState);
}
```

## 11. Multi-region model

Initial authoritative region: `eu-bg` / `europe-west1`.

Expansion order: `eu-de` → `eu-fr` → `uk-lon` → `us-east` → `ap-sg`.

Each region requires:

1. data-residency classification
2. allowed provider list
3. legal/compliance policy
4. language/localization pack
5. local evidence sources
6. latency/SLO target
7. budget ceiling
8. disaster-recovery target
9. tool allowlist
10. regional shutdown procedure

Global orchestration may route work, but private memory and regulated data remain in their authorized residency boundary.

## 12. Shopping and memberships

Shopping is a bounded workflow:

`Discover → Compare → Verify seller → Check owner policy → Quote → Approval → Purchase → Receipt → Ledger`

Default controls:

- no purchase without exact item/service scope
- price variance above 5% requires re-approval
- recurring memberships always require explicit approval before activation
- shipping address/payment credentials are never generated or guessed
- duplicate purchase detection is mandatory
- receipt must be stored before task completion
- cancellations/refunds are separate action classes

## 13. Analytics contract

Core KPIs:

- run success rate
- approval latency
- blocked-action rate
- tool failure rate
- evidence verification rate
- budget variance
- cost per successful outcome
- scheduler retry rate
- regional latency
- robotics safe-stop rate
- purchase duplicate rate
- membership renewal exposure

Event schema:

```json
{
  "event": "action.completed",
  "run_id": "run_01HZZZZZZZZZZZZZZZZZZZZZZZ",
  "correlation_id": "cor_01HZZZZZZZZZZZZZZZZZZZZZZZ",
  "actor": "founder-agent",
  "module": "mcp",
  "action_class": "read_only",
  "region": "eu-bg",
  "duration_ms": 842,
  "cost_eur": 0,
  "confidence": "VERIFIED",
  "outcome": "success",
  "timestamp": "2026-09-15T00:00:00Z"
}
```

Alerts:

- any unauthorized action attempt
- budget overrun or projected overrun
- repeated tool authentication failures
- payment verification failure
- robotics safety stop
- regional residency conflict
- evidence confidence downgrade
- scheduler backlog over threshold

## 14. Founder cockpit microcopy

**Live** — `Systems are running. Nothing important is hidden.`

**Needs approval** — `One decision is waiting. No action will move until you approve it.`

**Blocked** — `Execution stopped at the boundary. Resolve the blocker or leave it closed.`

**Verified** — `The system checked the result. Evidence is attached.`

**Budget** — `Committed, remaining, and projected spend are visible before action.`

**Next** — `The highest-value next move is ready.`

## 15. Emergency protocol

For any critical anomaly:

`STOP → ISOLATE → PRESERVE EVIDENCE → NOTIFY → ASSESS → ROLLBACK/RECOVER → VERIFY → RESUME`

Emergency stop supersedes scheduler, agent, commerce, deployment and robotics execution.

## 16. Acceptance gates

A release is `VERIFIED` only when:

- build succeeds from a clean checkout
- health endpoint responds
- database migration succeeds
- policy engine rejects unauthorized actions
- approval flow works
- audit events are durable
- secrets are absent from source and client bundles
- payment test challenge/receipt is verified on testnet
- robotics safety simulation passes
- region policy rejects unauthorized residency
- rollback procedure is exercised

Otherwise status is `READY`, `BLOCKED`, `FAILED`, or `UNVERIFIED`; never `LIVE` by assumption.

## 17. Revision protocol

Every evolution increments the architecture version and records:

`change → reason → affected modules → migration → verification → rollback`

Current target: `Founder Mode v2.0`.
