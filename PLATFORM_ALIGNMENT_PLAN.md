# EU AI Operator's Desk — Platform Alignment Plan

Status: PROPOSED / INSPECTED
Owner: A.K.
Canonical role: EU-facing intelligence, infrastructure planning, and operator enablement surface

## Executive decision

Do **not** merge this repository wholesale into MindReply.

Keep `eu-ai-operator-desk` as a distinct product surface and align it with the MindReply platform as a **specialized EU intelligence + infrastructure planning module**.

The repository already has a coherent product boundary: Strategic Market Atlas + Private Compute Configurator. Its React/Vite/Express architecture, evidence-led positioning, regional focus, and hardware workflow make it complementary to MindReply rather than a replacement for the MindReply owner/control plane.

Recommended relationship:

`EU AI Operator's Desk` → intelligence / planning / qualification layer

`MindReply / MRdash` → execution / workflow / owner-control layer

`Supabase/Postgres` → shared operational data layer where appropriate

`Stripe` → commercial checkout, subscriptions, partner/referral economics

`Links Connect` → financial/operational reconciliation across connected systems

`Soluvery` → access/sharing governance and exposure checks for connected documents/data

`Taste` → experience/content/product quality review layer

`Infographic Artist` → evidence-led visual system, diagrams, market/hardware explainers

## What was inspected

The repository currently contains:

- React 19 + Vite + TypeScript frontend
- Express backend
- Wouter routing
- Tailwind CSS 4
- Radix UI + Lucide + Framer Motion
- Strategic Atlas page
- Hardware Builder page
- Home and About pages
- Docker and docker-compose deployment assets
- GitHub deployment documentation/workflow references
- Both `package-lock.json` and `pnpm-lock.yaml`
- `.env.example` with browser-prefixed AI credentials and feature flags
- Extensive project/roadmap documentation

The README defines two primary desks: Strategic Market Atlas and Private Compute Configurator. The existing roadmap still treats AI integration, hardware optimization, EU localization, exports, and distribution as future work.

## Important security finding

`.env.example` currently models `VITE_OPENAI_API_KEY` and `VITE_ANTHROPIC_API_KEY` as browser variables. Any real secret placed in a `VITE_*` variable can be exposed to the client bundle.

Before enabling AI, payments, private data, or autonomous actions, replace this pattern with server-side secrets only. The browser should call controlled Express/API routes; the server should hold provider credentials. Never commit real credentials.

## Recommended platform architecture

### 1. Public EU intelligence surface

Keep the current public product identity and improve it into:

- Strategic Atlas
- Hardware / Private Compute Desk
- EU deployment patterns
- Evidence Room
- Regional opportunity briefs
- Build/export workflows
- Partner and service routes

This remains public-facing and does not need owner-console privileges.

### 2. MindReply execution bridge

Add a controlled handoff from the Desk into MindReply/MRdash:

`research → opportunity → recommendation → approved action → workflow → evidence`

Examples:

- Generate a market validation brief → send to MRdash as a tracked work item.
- Configure a private AI workstation → create a procurement/build record.
- Identify a qualified EU deployment opportunity → create a lead/opportunity record.
- Produce a compliance or deployment checklist → attach it to an execution workflow.

No autonomous purchase or irreversible external action should occur merely because the Desk generated a recommendation.

### 3. Shared data layer

Use Supabase/Postgres as the structured system of record where the same object needs to be consumed by both products.

Suggested entities:

- `market_sources`
- `market_opportunities`
- `evidence_items`
- `hardware_components`
- `hardware_builds`
- `deployment_profiles`
- `partner_routes`
- `lead_opportunities`
- `commercial_offers`
- `operator_actions`
- `approval_requests`
- `payment_events`
- `audit_events`

Keep public research data separate from private owner/customer data through explicit tenancy and access policies.

### 4. Stripe commercial layer

Stripe should be introduced only after the product/offer boundary is explicit.

Candidate paid surfaces:

- EU market intelligence brief
- Private compute design package
- Deployment readiness assessment
- Enterprise/operator advisory package
- Hardware configuration/procurement support
- Recurring intelligence subscription

Payment events should feed the operational ledger, not directly trigger unrestricted automation.

### 5. Links Connect

Use Links Connect for reconciliation and cross-system operational visibility rather than making it part of the public UX.

Target flow:

`Stripe / invoices / operational sources → Links Connect → normalized financial/operational view → MRdash evidence`

### 6. Soluvery

Use Soluvery around connected document exposure and sharing governance.

Target checks:

- public links
- externally accessible research packs
- shared deployment documents
- partner/customer artifacts
- private evidence that should remain owner-only

### 7. Taste + Infographic Artist

Treat these as quality/design support layers, not core runtime dependencies.

Taste: review product experience, copy hierarchy, interaction quality, and conversion paths.

Infographic Artist: create consistent evidence maps, market landscapes, hardware architecture diagrams, and operator-flow visuals.

## Integration boundaries

### Keep in EU AI Operator's Desk

- EU market intelligence
- regional opportunity research
- evidence presentation
- hardware configuration logic
- build comparison
- deployment education
- public documentation
- public calculators/configurators

### Move or reuse through MindReply

- owner authentication
- approvals
- private operator chat
- agent orchestration
- workflow execution
- external actions
- deployment control
- audit ledger
- live checks
- usage/budget controls
- machine-payment authorization

### Share through APIs/data contracts

- evidence
- market opportunities
- hardware builds
- deployment profiles
- offers
- leads
- payment/reconciliation events
- action status

## Machine-payment alignment

The Desk should not become the payment control plane.

It can expose machine-readable capability and pricing metadata, but MPP/x402 authorization, budgets, payment credentials, settlement, receipts, and owner approvals should live behind the MindReply execution/control layer.

Target:

`Desk request → MindReply policy/budget check → payment challenge → authorized execution → receipt → evidence ledger`

Production payment activation remains a separate verification gate.

## Repository cleanup before integration

1. Remove stale claims such as "ready/live" where deployment is not verified.
2. Correct repository metadata that still points to `eu-ai-operator/desk.git` if the canonical repository is now `angellllkr-eng/eu-ai-operator-desk`.
3. Consolidate dependency management around one lockfile/package-manager path.
4. Move AI provider secrets entirely server-side.
5. Add server-side API boundaries for AI and future paid operations.
6. Add explicit evidence/confidence types: VERIFIED / DIRECTIONAL / UNVERIFIED / BLOCKED.
7. Replace hard-coded market statistics with versioned source records and timestamps.
8. Add tests for the strategic and hardware flows.
9. Add structured export formats: JSON first, then CSV/PDF.
10. Add an integration contract for MindReply rather than copying MindReply internals into this repo.

## Phase plan

### Phase A — Harden

Security, dependency/lockfile cleanup, source provenance, deployment truthfulness, server-side secrets, tests.

### Phase B — Productize

Turn the Atlas and Hardware Builder scaffolds into durable public tools with structured evidence and exportable outputs.

### Phase C — Connect

Add authenticated, server-to-server handoff into MindReply/MRdash. No shared database tables until schemas and ownership are defined.

### Phase D — Commercialize

Introduce Stripe offers, receipts, subscriptions, and partner/referral economics. Reconcile through the financial/operational layer.

### Phase E — Operate

Use MRdash as the owner cockpit for approvals, workflow execution, deployment, budgets, evidence, and audit.

### Phase F — Machine economy

Only after the above is stable: MPP/x402 capability discovery, bounded machine payments, payment receipts, and policy-controlled autonomous execution.

## Decision matrix

| Option | Decision | Reason |
|---|---|---|
| Merge entire repo into MindReply | NO | Different public product boundary and runtime concerns |
| Archive the Desk | NO | Strong complementary EU intelligence + hardware surface |
| Keep totally isolated | NO | Misses the execution/control-plane opportunity |
| Keep separate + integrate with MindReply | **YES** | Cleanest architecture and strongest product story |
| Make Desk a MindReply module later | POSSIBLE | Reassess after API/data contracts and production hardening |

## Target platform map

`EU AI Operator's Desk`

→ Evidence + market intelligence

→ Hardware / deployment design

→ Qualified opportunity / build / assessment

→ **MindReply execution bridge**

→ MRdash approval + orchestration

→ Supabase/Postgres system of record

→ Stripe commercial events

→ Links Connect reconciliation

→ Soluvery exposure governance

→ Taste + Infographic Artist quality layer

→ Evidence + audit ledger

## Immediate implementation order

1. Harden this repository without changing its public identity.
2. Create canonical schemas/contracts for evidence, opportunities, builds, and handoffs.
3. Build a read-only MindReply handoff first.
4. Verify data flow end-to-end.
5. Add authenticated write actions only after the read-only path is proven.
6. Add Stripe after the commercial objects are stable.
7. Add MPP/x402 only behind owner-controlled policy and budgets.

This plan intentionally avoids a destructive merge. The strongest architecture is a **two-surface platform**: EU AI Operator's Desk for intelligence and qualification; MindReply for execution, control, and operations.
