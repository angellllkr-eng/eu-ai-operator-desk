# EU AI Operator's Desk — Machine Payments

## Architecture

The Desk is the qualification/product layer. MindReply remains the execution and policy-control plane. Paid resources are exposed behind HTTP 402 and must not bypass owner budgets, approval rules, or audit logging.

## Supported protocols

- MPP: preferred interface for machine-to-machine payments; supports one-time charge, usage sessions, and subscriptions, and is backwards-compatible with x402 clients.
- x402: compatibility gateway for existing machine-payment clients.

## Current implementation

Cloudflare Worker source: `cloudflare/payments/src/index.ts`

Paid resources:

- `GET /mpp/brief` — MPP charge, $0.01 test-stage amount.
- `GET /x402/brief` — x402 exact-payment route on Base Sepolia, $0.01 test-stage amount.
- `GET /health` — non-paid health endpoint.

The worker deliberately targets Base Sepolia/testnet first. Production settlement requires a verified recipient, production network, payment secrets, owner budget policy, receipt reconciliation, and an explicit promotion step.

## Required deployment secrets

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `MPP_SECRET_KEY`
- `PAYMENT_RECIPIENT`

No private key is stored in the repository.

## Operating path

Discover → 402 Challenge → Owner/Budget Policy → Payment Credential → Verify/Settle → Resource → Receipt → Audit → MindReply handoff

## Promotion gate

Do not switch from testnet to production until:

1. recipient address is verified;
2. payment limits are configured;
3. receipts map to an audit event;
4. failure/rollback handling is tested;
5. paid requests are visible to MRdash;
6. production network is explicitly approved.

## Cross-platform role

GitHub stores the source and deployment workflow. Cloudflare supplies the edge payment boundary. MindReply/MRdash remains the control plane. Stripe may be used for non-crypto/card commerce through MPP where appropriate.
