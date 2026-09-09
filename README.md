# EU AI Operator's Desk

**Evidence-led deployment guidance for European AI adopters.**

A public resource combining strategic market intelligence with hands-on hardware configuration for building local AI capability across Europe.

---

## What Is This?

EU AI Operator's Desk bridges two essential sides of AI adoption:

1. **Strategic Market Atlas** — Regional opportunity analysis, competitive pressure mapping, business model design, and 90-day validation roadmaps for founders, SMEs, and operators.
2. **Private Compute Configurator** — A ruled hardware ledger for building coherent local AI workstations (focused desk, parallel multi-agent, or enterprise lab).

Both are unified by a commitment to **evidence discipline**: verified sources, directional hypotheses labeled explicitly, and clear next-proof steps.

---

## Why Now?

Europe's AI adoption is fragmented:
- **8.5%** of Bulgarian enterprises use AI (2025) vs. **20%** EU average
- Regional trust, integration paths, and hands-on enablement are the missing layers
- Generic global platforms don't address language, compliance, or distributed workflows

This desk closes that gap with regional specificity, transparent research, and actionable guidance.

---

## Core Features

### Strategic Intelligence
- **PESTEL** + **Five Forces** analysis for competitive positioning
- **Portfolio scan** with evidence confidence (Verified / Directional / Unverified)
- **Business Model Canvas** and **7Ps** go-to-market frameworks
- **90-day roadmap** for turning strategy into proof
- **Evidence ledger** with public source citations

### Hardware Configuration
- **Component trade-off clarity** — why each choice matters
- **Real-time compatibility checking** — platform alignment, power headroom, GPU clearance
- **Operating modes** — Focused Desk / Parallel Multi-Agent / Enterprise Lab
- **Cost tracking** + **retailer routing** (Amazon, Newegg, B&H, Best Buy)
- **Build export** — copy your configuration as a summary

### Regional Focus
- Bulgarian language and culture (diaspora workflows, public services)
- Cross-border EU use cases (education, SME operations, compliance)
- Evidence-led market intelligence
- Partner ecosystem mapping (BRAIN++, INSAIT, local integrators)

---

## Getting Started

### Local Development

```bash
# Clone the repo
git clone https://github.com/eu-ai-operator/desk.git
cd desk

# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Open http://localhost:5173
```

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS 4
- **Backend**: Express.js (Node.js)
- **Components**: Radix UI, Lucide icons
- **Routing**: Wouter
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Toast notifications**: Sonner
- **Forms**: React Hook Form + Zod

---

## Project Structure

```
eu-ai-operator-desk/
├── client/
│   └── src/
│       ├── pages/
│       │   ├── Home.tsx                # Landing / dual-desk bridge
│       │   ├── StrategicAtlas.tsx      # Market intelligence
│       │   ├── HardwareBuilder.tsx     # Workstation configurator
│       │   └── About.tsx               # About + contribution guide
│       ├── components/
│       ├── contexts/
│       └── App.tsx                     # Main router
├── server/
│   └── index.ts                        # Express server
├── shared/
├── package.json
└── README.md
```

---

## Roadmap

### Phase 1: Foundation (Current)
- [x] Unified landing page bridging strategy + hardware
- [x] Strategic Atlas scaffold (Bulgarian + EU market intelligence)
- [x] Hardware Configurator scaffold (component selection, compatibility)
- [ ] Integrate original Bulgarian strategy analysis into Atlas
- [ ] Integrate original MegaAgent hardware data into Configurator

### Phase 2: Intelligence
- [ ] Claude/OpenAI API integration for strategic recommendations
- [ ] Hardware optimization suggestions based on workload
- [ ] EU market personalization (country-specific data, regulatory notes)
- [ ] AI-powered build validation and cost optimization

### Phase 3: Distribution
- [ ] Public GitHub pages deployment
- [ ] Regional language support (Bulgarian, Polish, German, French)
- [ ] Partner ecosystem links (integrators, resellers, training)
- [ ] Community contributions: case studies, hardware builds, market insights

### Phase 4: Operationalization
- [ ] Pilot program integration
- [ ] Measurement framework (adoption, outcomes, feedback loops)
- [ ] Iterative roadmap updates based on real deployment data
- [ ] Sustainability model (sponsorship, partner revenue share, open-source support)

---

## Contributing

We welcome contributions: market insights, hardware data, translations, case studies, and deployment patterns.

### How to Contribute

1. **Fork** the repo
2. **Create a branch** (`feature/your-idea`)
3. **Commit** your changes
4. **Push** and open a **Pull Request**

### Contribution Areas

- **Market Intelligence**: Regional analysis, competitive data, regulatory insights
- **Hardware Guidance**: Component reviews, build optimizations, cost analysis
- **Regional Translations**: Bulgarian, Polish, German, French, others
- **Case Studies**: Real deployment stories, measurement results, lessons learned
- **Integration Partnerships**: Ecosystem connections, partner data, referral routes

---

## License

MIT — Feel free to use, modify, and distribute.

---

## Contact & Feedback

- **GitHub Issues**: Report bugs, request features, suggest improvements
- **Email**: hello@eu-ai-desk.com
- **Contribute**: See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## Acknowledgments

- **Bulgarian GCE AI Strategy** — Original strategic market analysis
- **MegaAgent PC Studio** — Hardware configuration framework
- **BRAIN++**, **INSAIT**, **BgGPT** — Regional AI ecosystem partners
- **European Commission** — Digital Decade initiatives, AI Act framework
- **Community contributors** — Market insights, deployment data, regional expertise

---

**EU AI Operator's Desk** — Evidence-led. Community-driven. European by design.

Start exploring strategy or configure your first workstation at [eu-ai-desk.com](https://eu-ai-desk.com).
