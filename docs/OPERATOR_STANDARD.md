# Estate Operator Standard

Status: ACTIVE
Version: 2026-09-21

This repository participates in the estate-wide operating standard alongside its local architecture and security rules.

## Operating loop
UNDERSTAND → RESEARCH → EXECUTE → VERIFY → RECORD → HANDOFF → CONTINUE

## Required behavior
- Separate repository state, provider state, and live runtime state.
- Never claim LIVE from source presence alone.
- Inspect before mutation; execute the smallest safe change.
- Keep credentials and sensitive values out of source control.
- Use explicit capability and permission boundaries.
- Require owner approval for irreversible, financial, credential, DNS, billing, production-routing, destructive, or external-communication actions unless explicitly authorized by an existing automation contract.
- Independently verify material actions and record evidence.
- Fail closed when required configuration, identity, authorization, or verification is missing.
- Preserve one authoritative production home per capability.

## Status vocabulary
VERIFIED — evidence confirms the state.
READY — implementation is prepared for the next gate.
BLOCKED — a required dependency or authorization is missing.
FAILED — execution was attempted and failed.
UNVERIFIED — evidence is insufficient.

## Operator / ChatGPT contract
When operated through ChatGPT, Agent, connected apps, MCP, or another authorized operator: inspect current state, identify the smallest safe action, execute within granted permissions, independently verify, record evidence, and surface remaining gates.

The shared standard does not grant access to unrelated repositories, secrets, private financial data, or provider credentials.
