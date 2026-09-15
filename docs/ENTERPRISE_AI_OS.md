# Enterprise AI OS — Founder Mode

Status: VERIFIED ARCHITECTURE / DEPLOYABLE CONTROL CONTRACT
Owner surface: EU AI Operator's Desk
Execution surface: MindReply / MRdash

## 1. Operating model

The system is a closed-loop operating layer:

`Memory → Planner → Scheduler → MCP Tools → Execution → Analytics → Memory`

One Orchestrator owns policy, approval state, escalation and final dispatch. Modules remain independently replaceable.

### Modules

| Module | Responsibility | Write authority |
|---|---|---|
| Orchestrator | Policy, routing, approvals, escalation | Controlled |
| Memory | Decisions, evidence, preferences, provenance | Controlled |
| Planner | Goal decomposition and dependency graph | Draft |
| Scheduler | Time/condition-based execution | Controlled |
| Analytics | KPI/event evaluation and anomaly detection | Append-only |
| MCP Tools | External service/tool execution | Capability-scoped |
| Shopping / Memberships | Commercial discovery and recurring service operations | Approval-gated |
| Robotics | Physical-world command planning | Safety-gated |
| Multi-region | Regional policy, residency and deployment routing | Policy-gated |
| Founder Presence | Cockpit UX, decision summaries and live signals | Read-only |

## 2. Authority rules

1. No external purchase, irreversible deployment, credential rotation, physical actuation or financial transfer occurs without an explicit authorization policy permitting that class of action.
2. Secrets never enter browser bundles, Git history, prompts, logs or analytics payloads.
3. Every externally material action receives an immutable audit event containing actor, policy, target, intent, result and evidence reference.
4. Autonomous execution is bounded by budget, scope, rate, region and rollback policy.
5. A low-confidence or conflicting input routes to review rather than being silently resolved.
6. Robotics commands require a safety envelope, heartbeat and emergency-stop path.
7. Region routing must respect data residency, legal constraints and service availability before dispatch.
8. Payment protocols may expose a 402 challenge, but payment settlement remains policy-controlled.

## 3. Core object model

`Goal → Plan → Task → Approval → Execution → Result → Evidence → KPI → Memory`

Each object has a stable ID, creation timestamp, owner, provenance and lifecycle state.

Lifecycle states:

`DRAFT → READY → APPROVAL_REQUIRED → APPROVED → RUNNING → SUCCEEDED | FAILED | BLOCKED | CANCELLED`

## 4. Orchestrator loop

```text
receive goal
  ↓
resolve memory + policy
  ↓
construct dependency graph
  ↓
classify tasks by capability/risk
  ↓
parallelize independent read-only work
  ↓
request approval for controlled actions
  ↓
execute through scoped tools
  ↓
verify outputs and side effects
  ↓
append evidence + analytics
  ↓
update memory
  ↓
re-plan only from verified state
```

The orchestrator never treats a proposed action as completed work.

## 5. Parallelism policy

Parallel work is permitted when tasks have no conflicting writes and share no mutable exclusive resource. Payment, deployment, credential, database migration and robotics actuation paths are serialized behind their policy gate.

Parallel groups:

- research / evidence retrieval
- repository inspection
- static quality checks
- analytics aggregation
- regional capability discovery
- UI/content review

Serialized groups:

- production deployment promotion
- payment settlement
- secret rotation
- schema migration
- physical actuation

## 6. Enterprise API surface

The public Desk exposes only non-sensitive capability metadata. Control-plane APIs are private and belong behind authenticated MindReply infrastructure.

Public:

- `GET /health`
- `GET /api/operator/capabilities`
- `GET /llms.txt`

Private control-plane contract:

- `POST /v1/goals`
- `POST /v1/plans`
- `POST /v1/approvals/:id/decision`
- `POST /v1/tasks/:id/execute`
- `GET /v1/evidence/:id`
- `GET /v1/audit`
- `GET /v1/analytics/summary`
- `POST /v1/robotics/commands`

These private routes require MindReply identity, capability-scoped authorization and audit logging.

## 7. Memory model

Memory is evidence-first, not personality-first.

Required fields:

- `memory_id`
- `namespace`
- `subject`
- `content`
- `embedding`
- `source_uri`
- `source_hash`
- `confidence`
- `valid_from`
- `valid_until`
- `owner_scope`
- `region`
- `created_at`
- `updated_at`

Confidence enum:

`VERIFIED | CORROBORATED | DIRECTIONAL | UNVERIFIED | BLOCKED`

Sensitive memory is owner-scoped and deletable.

## 8. Scheduler model

Scheduler inputs are event, time, dependency and condition triggers.

A scheduled task must declare:

- trigger
- timezone
- maximum runtime
- retry policy
- idempotency key
- required capability
- budget
- approval policy
- rollback strategy
- evidence requirement

Retries use exponential backoff with a bounded maximum and never repeat a non-idempotent external action without an explicit idempotency key.

## 9. Analytics model

Every execution emits:

`intent_received`, `plan_created`, `approval_requested`, `approval_granted`, `execution_started`, `execution_succeeded`, `execution_failed`, `execution_blocked`, `evidence_recorded`, `payment_challenged`, `payment_settled`, `rollback_started`, `rollback_completed`.

Primary KPIs:

- goal-to-success latency
- approval latency
- execution success rate
- blocked-action rate
- evidence coverage
- stale-memory rate
- tool error rate
- cost per successful outcome
- payment challenge-to-settlement rate
- rollback frequency
- regional availability
- robotics command rejection rate

## 10. Machine payments

MPP is the preferred machine-payment interface where supported; x402 remains the compatibility layer. A paid resource returns a 402 challenge, payment is fulfilled, the server verifies settlement, and the result carries a receipt. Cloudflare documents both protocols for agentic payments. citeturn0search1turn0search2

Production policy:

- test with `base-sepolia`
- production network only after recipient and budget policy are verified
- payment requests are approval-gated when they exceed autonomous thresholds
- receipts are persisted as evidence
- no private payment keys in Git or browser code

## 11. Robotics integration

Robotics is an execution adapter, not an unrestricted agent.

Command lifecycle:

`PLAN → SAFETY_CHECK → ARM → EXECUTE → VERIFY → DISARM`

Hard stops:

- emergency stop asserted
- heartbeat lost
- safety envelope violated
- unexpected pose/state
- command timeout
- region/site authorization mismatch
- operator cancellation

The physical controller owns the final safety interlock. AI cannot bypass it.

## 12. Multi-region model

Each region has:

- deployment target
- data residency policy
- legal/policy profile
- allowed tools
- approved payment methods
- observability endpoint
- incident contact
- failover policy

Default launch regions: `EU`, `UK`, `US`.

A request is routed only after policy evaluation confirms that its data and action scope are permitted in the target region.

## 13. Founder cockpit

The cockpit is intentionally sparse. The first screen answers:

1. What changed?
2. What is running?
3. What is blocked?
4. What needs approval?
5. What did it cost?
6. What evidence proves it?
7. What happens next?

Primary cards:

`LIVE SYSTEMS | APPROVAL QUEUE | ACTIVE RUNS | BLOCKERS | SPEND | EVIDENCE | REGIONS | ROBOTICS`

## 14. Definition of done

A feature is complete only when code, configuration, authorization, observability, rollback and verification evidence exist. Documentation alone never changes a status to VERIFIED.
