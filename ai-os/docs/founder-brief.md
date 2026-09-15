# Founder Brief — Enterprise AI OS

How to revise: Owner = Founder.

Enterprise AI OS is the private execution layer between founder intent and governed enterprise action.

Reality -> Authority -> Planning -> Execution -> Evidence -> Operation.

The orchestrator coordinates memory, planning, scheduling, analytics, MCP tools and regional execution through explicit policy. Provider neutrality is intentional: cloud vendors can change without changing the operating model.

Founder authority remains highest. Automation may propose and execute only within granted policy; it cannot silently expand authority. Irreversible/external actions require approval unless an explicit emergency policy applies.

Identity is OIDC + PKCE. Sessions are secure. Launcher tokens are short-lived RS256 JWTs. Every material action is auditable. Compliance is a hard gate.

Robotics is isolated behind a safety boundary with emergency stop for region or all scope. Emergency stop must not depend on ordinary optimization logic.

This repository is a testable control-plane scaffold. Production requires real identity metadata, legal review, cloud configuration, secrets, E2E evidence and operational sign-off.