# EU AI Operator’s Desk

**Status:** READY FOR REVIEW on `product-launch-2026-09`

EU AI Operator’s Desk is a public qualification and deployment-guidance surface for European AI adoption. It connects market evidence, AI-use-case qualification, private compute design, and structured handoff into an execution platform.

## Product surfaces

| Route | Purpose | Status |
|---|---|---|
| `/` | Operator homepage and use-case qualification | UPDATED |
| `/strategy` | Strategic Atlas | READY |
| `/hardware` | Private Compute Configurator | READY |
| `/about` | Mission and contribution model | READY |
| `/404` | Fallback | READY |

## Operating model

```text
Discover → Qualify → Design → Approve → Execute → Record
```

The Desk is the qualification layer. MindReply / MRdash is the intended execution and control layer.

## Current use cases

- AI adoption qualification
- AI Act readiness questions and evidence mapping
- EU market and sector expansion
- Private workstation / private-lab design
- Commercial offer qualification
- Structured operator handoff

## Platform alignment

```text
EU AI Operator’s Desk
       ↓
Evidence + opportunity package
       ↓
MindReply / MRdash
       ↓
Supabase/Postgres · Stripe · operational connectors
       ↓
Execution · monitoring · receipts · audit
```

The Desk must remain independent enough to inform a human decision or another platform. It should not become the credential vault or autonomous payment engine.

## Security boundary

Provider credentials belong server-side. Browser-visible `VITE_*` variables may only contain public configuration/identifiers. Paid, destructive, or otherwise irreversible actions require an explicit owner approval policy.

## Evidence policy

Material claims should record source provenance, publication/check dates, and one of:

- `VERIFIED`
- `DIRECTIONAL`
- `UNVERIFIED`
- `BLOCKED`

## Repository

Canonical repository: https://github.com/angellllkr-eng/eu-ai-operator-desk

Package metadata now points to this repository. See `docs/USE_CASES_AND_PLATFORM_PLAN.md` for the cross-platform architecture and rollout sequence.

## Deployment

The repository already contains GitHub Pages workflows. Production hosting remains a deployment configuration to verify from GitHub Actions rather than a claim of a currently live public URL.

## Next verified actions

1. Review and merge `product-launch-2026-09` into `master`.
2. Verify GitHub Actions build/deploy success.
3. Confirm the public URL and route health.
4. Add real evidence records to the Strategic Atlas.
5. Define the Desk → MindReply handoff schema before any write integration.
6. Add Supabase/Postgres persistence, then commercial integrations.
