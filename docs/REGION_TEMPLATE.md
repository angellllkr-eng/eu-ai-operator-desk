# Multi-Region Operating Template

Each region is a policy boundary, not only a deployment target.

## EU

- primary launch region
- GDPR/data-residency policy required
- EU AI Act policy profile required
- EU-hosted storage preferred for EU-scoped sensitive data
- payment and tool capabilities explicitly allowlisted

## UK

- separate policy profile from EU
- UK data handling and contractual requirements evaluated independently
- UK payment/tool capabilities explicitly allowlisted

## US

- separate policy profile
- US data processing and contractual requirements evaluated independently
- US payment/tool capabilities explicitly allowlisted

## Region record

```json
{
  "region": "EU",
  "deployment": "primary",
  "data_residency": "EU",
  "allowed_tools": ["research", "github", "analytics"],
  "payment_methods": ["mpp", "x402", "stripe"],
  "robotics_enabled": false,
  "failover_region": "UK",
  "policy_version": "1.0"
}
```

The example above is a policy shape, not a claim that every listed capability is currently activated. Activation requires account-level verification.

## Promotion gate

A deployment may promote only when:

1. region policy is resolved
2. data residency is compatible
3. secrets are present in the target secret manager
4. health checks pass
5. rollback target exists
6. audit logging is active
7. payment configuration is verified if payments are enabled
8. operator approval is recorded for production promotion
