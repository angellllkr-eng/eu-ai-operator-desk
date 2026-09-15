# Deployment Checklist

How to revise: Owner = Founder + platform contractor.

## Identity
- [ ] Real OIDC issuer/client/audience/JWKS configured.
- [ ] Exact HTTPS redirect URI allowlist.
- [ ] Authorization-code + PKCE, state and nonce verified.
- [ ] ID-token signature/iss/aud/exp/nonce verified against JWKS.
- [ ] Secure HttpOnly/Secure/SameSite=Strict session verified.

## Cloud
- [ ] Dev/staging/prod isolation.
- [ ] Cloud Run least-privilege service accounts.
- [ ] JWT keys and API secrets in Secret Manager.
- [ ] API Gateway routes/rate limits deployed.
- [ ] Logs, metrics, traces and alerts active.

## Compliance
- [ ] Age verification.
- [ ] Geo eligibility.
- [ ] KYC/AML hooks where legally required.
- [ ] Self-exclusion.
- [ ] Deposit limits.
- [ ] Session timeouts.
- [ ] GDPR purpose/minimisation/retention/deletion.
- [ ] UK legal/regulatory review before gambling production.

## Robotics
- [ ] ROS2/gRPC boundary deployed.
- [ ] Region and all emergency-stop E2E tests pass.
- [ ] Launch halt + ops notification verified.
- [ ] Telemetry loss/failover tests pass.

## Acceptance
- [ ] Mock IdP SSO passes.
- [ ] RS256 launcher token has sub/game_id/session_id/iat/exp/region/kid and <=120s TTL.
- [ ] Every material action emits actor/action/timestamp/plan_id.
- [ ] Monitoring thresholds fire.
- [ ] No secrets in Git, logs or client bundles.