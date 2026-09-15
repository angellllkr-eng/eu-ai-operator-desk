# Enterprise AI OS

Founder-grade, provider-neutral control plane for governed AI orchestration, secure launcher integration, memory, scheduling, analytics, MCP tools, compliance, and robotics safety.

Status: READY FOR CONTRACTOR BUILD; production remains UNVERIFIED until real IdP, cloud, secrets, legal/compliance and E2E evidence exist.

## Operating model
Reality -> Authority -> Planning -> Execution -> Evidence -> Operation.

Agents: Orchestrator, Planner, Execution, Memory, Analytics, Optimization, MCP Tools, Robotics Integration, Multi-Region, Founder Presence.

Core services: API Gateway, Auth Gateway, Launcher, Planner, Scheduler, MCP, Memory/vector store, Analytics/observability, Robotics safety boundary.

Security: OIDC authorization-code + PKCE; JWKS ID-token verification; HttpOnly/Secure/SameSite=Strict sessions; short-lived RS256 launch tokens; least-privilege IAM; Secret Manager; audit events.

Sky-style parameters are untrusted input: redirect_uri, state, nonce, product and returnURL require strict validation/allowlisting. No credentials or private keys belong in Git.

Every material agent action emits `{actor, action, timestamp, plan_id}`.

How to revise: Owner = Founder + platform contractor. Keep service contracts, security boundaries and acceptance criteria synchronized.