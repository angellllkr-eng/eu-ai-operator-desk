# Contributing to EU AI Operator's Desk

We welcome contributions from researchers, operators, hardware enthusiasts, and anyone building AI capability in Europe.

## How to Contribute

### Reporting Issues
1. **Check existing issues** — avoid duplicates
2. **Be specific** — include expected vs. actual behavior
3. **Provide context** — OS, browser, Node version, error logs

### Submitting PRs

1. **Fork** the repo
2. **Create a branch**: `git checkout -b feature/your-idea`
3. **Commit** with clear messages: `git commit -m "Add hardware configs for AM5 platform"`
4. **Push**: `git push origin feature/your-idea`
5. **Open a PR** with a description of what and why

### Code Standards

- **TypeScript**: strict mode, no `any`
- **React**: functional components + hooks
- **Styling**: Tailwind CSS 4, component-scoped `<style>` blocks
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: inline for logic, JSDoc for exports

### Contribution Areas

#### Market Intelligence
- Regional AI adoption analysis (survey data, policy, regulatory insights)
- Competitive landscaping (player mapping, market dynamics)
- Use case analysis (SME challenges, public service integration, diaspora workflows)
- Evidence sources (research papers, analyst reports, government data)

**How to contribute:**
- Add regional analysis to `/strategy-data/`
- Include sources with DOI, URLs, or publication details
- Label confidence: Verified / Directional / Unverified
- PR example: "Add 2025 EU AI Act compliance requirements"

#### Hardware Guidance
- Component data (CPU/GPU/motherboard compatibility matrices)
- Pricing and availability tracking
- Build profiles (optimized configs for specific workloads)
- Retailer mappings and sourcing guides
- Performance benchmarks (measured on typical EU platforms)

**How to contribute:**
- Add component specs to `/hardware-data/`
- Include link/SKU and regional availability (DE, FR, BG, PL, etc.)
- Build templates: `/hardware-builds/` (focus-desk, multi-agent, enterprise-lab)
- PR example: "Add AM5 ecosystem configs and EU retailer routing"

#### Translations
- Bulgarian, Polish, German, French, and others
- UI strings, documentation, case studies

**How to contribute:**
- Add i18n strings to `/client/locales/`
- Use keys like `atlas.pestel.title`
- Include context comments for ambiguous strings
- PR example: "Add Bulgarian localization (home, atlas, about pages)"

#### Case Studies
- Real deployment stories (company, use case, outcomes, learnings)
- Performance reports (speed, cost, integration challenges)
- Pilot results and measurement data

**How to contribute:**
- Add case study to `/docs/case-studies/`
- Template: company, industry, scale, GPU/CPU config, budget, timeline, results
- Include contact/attribution
- PR example: "Case study: Polish SME AI adoption pilot"

#### Ecosystem Partnerships
- Integrator/reseller contacts and resources
- Training program information
- Regional support networks
- Open APIs for third-party tools

**How to contribute:**
- Update `/docs/ecosystem/`
- Include verified contacts, URLs, service scope
- PR example: "Add INSAIT AI bootcamp and partner routes"

---

## Development Setup

```bash
# Clone and install
git clone https://github.com/eu-ai-operator/desk.git
cd desk
pnpm install

# Run dev server (http://localhost:5173)
pnpm dev

# Type check
pnpm check

# Format code
pnpm format

# Build for production
pnpm build
```

---

## Project Structure

```
eu-ai-operator-desk/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Landing page
│   │   │   ├── StrategicAtlas.tsx    # Market intelligence
│   │   │   ├── HardwareBuilder.tsx   # Configurator
│   │   │   └── About.tsx             # About + contribution
│   │   ├── components/               # Shared UI
│   │   ├── contexts/                 # Theme, state
│   │   └── App.tsx                   # Main router
│   └── index.html
├── server/
│   └── index.ts                      # Express backend
├── shared/
│   └── const.ts                      # Shared constants
├── docs/
│   ├── case-studies/                 # Deployment stories
│   ├── ecosystem/                    # Partner data
│   └── strategy/                     # Market analysis
├── hardware-data/
│   ├── components/                   # CPU/GPU/mobo specs
│   └── builds/                       # Config templates
└── package.json
```

---

## Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Examples:**
- `feat: add AM5 motherboard compatibility matrix`
- `docs: Bulgarian SME adoption case study`
- `fix: hardware builder cost calculation`
- `style: unify atlas and hardware UI spacing`

---

## Code Review

We'll review your PR for:
- **Clarity**: Is the code easy to understand?
- **Accuracy**: Is the data/analysis correct and sourced?
- **Completeness**: Does it include tests, docs, examples?
- **Fit**: Does it align with project goals?

Feedback is collaborative — we're here to help!

---

## Licensing

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).

---

## Questions?

- Open an issue (bug, feature request, question)
- Email: hello@eu-ai-desk.com
- Join discussions on GitHub

---

**Thank you for building EU AI capability!** 🇪🇺
