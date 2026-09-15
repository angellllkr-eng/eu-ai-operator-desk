# Contributing to EU AI Operator's Desk

We welcome contributions from researchers, operators, hardware engineers, and teams building AI capability in Europe.

## How to Contribute

1. Check existing issues and pull requests.
2. Create a focused branch from `master`.
3. Make the smallest coherent change.
4. Run `pnpm check` and `pnpm build`.
5. Open a pull request with evidence of verification.

## Quality rules

- TypeScript strict mode; avoid `any`.
- React functional components and hooks.
- Tailwind CSS 4.
- Evidence-led data with source and confidence labels.
- Never commit secrets or browser-visible provider credentials.
- Never claim a deployment is live without deployment evidence.
- Material external actions require the appropriate MindReply approval policy.

## Contribution areas

### Market Intelligence

Add sourced regional analysis, regulatory intelligence, use cases and opportunity qualification. Label evidence `VERIFIED`, `CORROBORATED`, `DIRECTIONAL`, `UNVERIFIED` or `BLOCKED`.

### Hardware Guidance

Add compatibility matrices, component data, build profiles, regional pricing/availability and measured benchmarks. Preserve source provenance.

### Translations

Add localized UI and documentation with terminology reviewed for the target market.

### Case Studies

Use measured outcomes: company/use case, workload, infrastructure, budget, timeline, results and evidence.

### Ecosystem Partnerships

Add verified integrators, resellers, training providers and support networks with scope and source URLs.

## Development setup

```bash
git clone https://github.com/angellllkr-eng/eu-ai-operator-desk.git
cd eu-ai-operator-desk
pnpm install
pnpm dev
pnpm check
pnpm build
```

The application exposes `/health` and `/api/operator/capabilities` when the Express server is running.

## Architecture boundary

The Desk is the European intelligence and qualification layer. MindReply / MRdash is the execution and control plane. Do not copy credentials, payment keys or private orchestration state into the public Desk.

Robotics is safety-gated. MPP/x402 payment flows are policy-controlled and must not bypass approval or budget controls.

## Commit format

Use `feat:`, `fix:`, `docs:`, `refactor:`, `test:` or `chore:` followed by a concise subject.

## Code review

Reviewers check clarity, source accuracy, security, tests, deployment evidence and architectural fit.

## License

MIT.
