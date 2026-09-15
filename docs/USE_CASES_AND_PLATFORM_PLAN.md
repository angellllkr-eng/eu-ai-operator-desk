# EU AI Operator’s Desk — Use Cases & Platform Plan

Status: EXECUTING on `product-launch-2026-09`

## Product role

EU AI Operator’s Desk is the qualification and evidence surface for European AI adoption. It should answer:

- Is this AI opportunity worth pursuing?
- What evidence supports the decision?
- What deployment/compliance questions must be resolved?
- What private compute or cloud profile fits the workload?
- What structured handoff should reach the execution layer?

It should not become the payment processor, deployment controller, credentials vault, or autonomous execution engine. Those responsibilities belong deeper in the platform.

## Current high-value use cases

1. **AI adoption qualification** — turn an idea into a scoped wedge, target, evidence set and 90-day proof path.
2. **AI Act readiness** — frame the relevant risk category, affected parties, documentation questions, governance owner and next evidence needed. This is decision support, not legal advice.
3. **Private compute design** — map workload requirements to workstation/private-lab configurations with compatibility and cost trade-offs.
4. **EU market expansion** — qualify countries, sectors, partners, procurement paths and adoption barriers.
5. **Commercial qualification** — define an offer, assumptions and owner approval point before checkout or execution.
6. **Operator handoff** — package a structured decision for MindReply/MRdash or another execution platform.

## Why now

The EU AI Act entered its general application phase on 2 August 2026, while several high-risk provisions have later transition dates. The Desk should therefore make evidence, ownership and deployment context first-class objects rather than treating regulation as a static content page.

Europe is simultaneously expanding AI infrastructure through AI Factories and AI Gigafactories. That creates a practical bridge between market qualification and compute/deployment decisions.

## Platform architecture

```text
EU AI Operator’s Desk
  ├─ Strategic Atlas
  ├─ Evidence ledger
  ├─ Private Compute Configurator
  ├─ Opportunity / offer qualification
  └─ Structured handoff
          │
          ▼
MindReply / MRdash
  ├─ approval queue
  ├─ workflow orchestration
  ├─ deployment / monitoring
  ├─ audit + receipts
  └─ owner control
          │
          ├── Supabase/Postgres — system of record
          ├── Stripe — commercial transactions
          ├── Links Connect — financial/operational reconciliation
          ├── Soluvery — exposure/access checks
          └── MPP / x402 — later machine-payment rail
```

## Integration contracts

### Desk → MindReply

Pass a machine-readable opportunity package, not raw browser state.

Required fields:

- `opportunity_id`
- `title`
- `sector`
- `country_or_region`
- `problem`
- `recommended_wedge`
- `evidence[]`
- `confidence`
- `deployment_profile`
- `commercial_profile`
- `requested_action`
- `approval_required`
- `created_at`

### Evidence object

```json
{
  "source": "https://example.eu/source",
  "title": "Source title",
  "published_at": "2026-09-15",
  "checked_at": "2026-09-15",
  "confidence": "VERIFIED",
  "claim": "What this source actually supports",
  "notes": "Context or limitation"
}
```

Allowed confidence values: `VERIFIED`, `DIRECTIONAL`, `UNVERIFIED`, `BLOCKED`.

## Phased execution

### Phase A — Public product (now)

- Refresh homepage positioning.
- Add explicit use cases and operator flow.
- Correct repository and metadata drift.
- Remove browser-side provider secret placeholders.
- Publish machine-readable capability metadata.

### Phase B — Evidence system

- Normalize sources and timestamps.
- Add opportunity/evidence objects.
- Add exports: JSON, CSV and PDF.
- Add visible confidence and provenance.

### Phase C — Execution bridge

- Build a read-only Desk → MindReply handoff contract.
- Add approval state and immutable request IDs.
- Persist accepted handoffs in Supabase/Postgres.

### Phase D — Commercial layer

- Model offers and pricing outside the browser.
- Add Stripe checkout only after offer definitions are stable.
- Reconcile commercial events through the operational ledger.

### Phase E — Autonomous operations

- Add automation only behind explicit owner policy.
- Add MPP/x402 only after identity, budgets, approvals, receipts and rollback are verified.

## Go / Hold / Blocked

| Area | Status | Decision |
|---|---|---|
| Public homepage | VERIFIED | Launch on `product-launch-2026-09` |
| Strategy desk | READY | Keep and enrich with real evidence |
| Compute desk | READY | Keep; connect to build/export contracts |
| MindReply handoff | READY FOR DESIGN | Add API contract before write access |
| Supabase runtime | HOLD | Connect after schema contract |
| Stripe runtime | HOLD | Connect after offer model |
| Links Connect | HOLD | Use for reconciliation, not source content |
| Soluvery | HOLD | Use for exposure/access review |
| Machine payments | DEFERRED | Use MPP/x402 behind MindReply control plane |
| Browser AI secrets | FIXED | Server-side only |

## Immediate operating target

The Desk should become the place where a European AI opportunity is made legible and qualified. MindReply should become the place where an approved decision becomes an executed, monitored, auditable workflow.
