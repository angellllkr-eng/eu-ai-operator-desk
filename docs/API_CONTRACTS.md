# Enterprise AI OS — API Contracts

## Authentication boundary

Private control-plane routes are intended for MindReply / MRdash. The Desk public server must not accept founder credentials, payment keys or robotics credentials.

Required controls for private deployment:

- OIDC identity
- short-lived access token
- audience-bound token
- capability scopes
- idempotency key for mutations
- request correlation ID
- append-only audit event

## Goal

`POST /v1/goals`

Request:

```json
{
  "goal_id": "uuid",
  "title": "Qualify private AI deployment",
  "objective": "Produce a verified recommendation and execution handoff",
  "region": "EU",
  "risk_class": "commercial",
  "budget": { "currency": "EUR", "maximum": 5000 },
  "approval_policy": "founder-required"
}
```

Response:

```json
{
  "goal_id": "uuid",
  "state": "READY",
  "plan_id": "uuid",
  "correlation_id": "uuid"
}
```

## Approval

`POST /v1/approvals/:id/decision`

```json
{
  "decision": "APPROVED",
  "reason": "Founder authorization",
  "scope": { "max_spend_eur": 5000, "regions": ["EU"] }
}
```

## Task execution

`POST /v1/tasks/:id/execute`

Headers:

- `Authorization: Bearer <short-lived-token>`
- `Idempotency-Key: <unique-key>`
- `X-Correlation-ID: <correlation-id>`

Response:

```json
{
  "task_id": "uuid",
  "state": "RUNNING",
  "execution_id": "uuid"
}
```

## Evidence

`GET /v1/evidence/:id`

```json
{
  "evidence_id": "uuid",
  "confidence": "VERIFIED",
  "source_uri": "https://example.invalid/source",
  "source_hash": "sha256:...",
  "observed_at": "2026-09-15T00:00:00Z",
  "claim": "Verified execution result",
  "artifacts": []
}
```

## Robotics command contract

`POST /v1/robotics/commands`

```json
{
  "robot_id": "robot-001",
  "site_id": "site-eu-01",
  "command_id": "uuid",
  "command": "NAVIGATE",
  "target": { "frame": "map", "x": 1.2, "y": 2.4, "yaw": 0.0 },
  "safety": {
    "max_speed_mps": 0.4,
    "timeout_ms": 10000,
    "require_heartbeat": true,
    "require_estop_clear": true
  }
}
```

The API must reject a command when site authorization, heartbeat, safety state, or operator approval is missing.

## Payment contract

Paid resources use HTTP 402. MPP is preferred where available; x402 is accepted for compatibility. The Desk does not store payer private keys.

The payment boundary records:

`challenge_id`, `resource`, `amount`, `currency`, `network`, `recipient`, `approval_state`, `settlement_reference`, `receipt_reference`.

No payment is considered successful until settlement verification is recorded.
