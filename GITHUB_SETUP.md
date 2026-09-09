# GitHub Initialization Guide — EU AI Operator's Desk

## Step 1: Create GitHub Repository

1. Go to **[github.com/new](https://github.com/new)**
2. **Repository name**: `desk`
3. **Description**: "Evidence-led deployment guidance for European AI adopters"
4. **Public** (important for visibility and contributions)
5. **Initialize without README** (we have one locally)
6. Click **Create repository**

---

## Step 2: Link Local Repo and Push

```bash
cd ~/Desktop/eu-ai-operator-desk

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/desk.git

# Verify remote
git remote -v

# Push initial commit
git branch -M main
git push -u origin main
```

---

## Step 3: Enable Pages for Static Hosting

1. Go to **repository Settings → Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main` / folder: `/(root)`
4. Save

(GitHub Actions workflow will auto-deploy built files on push)

---

## Step 4: Repository Settings

### General
- [ ] Allow issues (enabled by default)
- [ ] Allow discussions (enable for community Q&A)
- [ ] Default branch: `main`

### Collaborators
- [ ] Add core maintainers (Bulgarian, EU partners)

### Secrets (for CI/CD)
- [ ] Add `OPENAI_API_KEY` if using AI features in automation

### Branch Protection (optional, for main)
- [ ] Require pull request reviews
- [ ] Require status checks to pass
- [ ] Require branches to be up-to-date

---

## Step 5: Project Structure in GitHub

Create these key issues/discussions:

### Issues (Templates)
- **Bug report**: "Something isn't working"
- **Feature request**: "Strategic analysis gap", "Hardware config question"
- **Community insight**: "Regional market data", "Use case proposal"

### Discussions (Q&A)
- "Market opportunities by country"
- "Hardware build advice"
- "Integration partnerships"

### Projects (Kanban)
- **Phase 1**: Atlas + Hardware scaffolds (DONE)
- **Phase 2**: AI integration & Regional data
- **Phase 3**: Multi-language support

---

## Step 6: Promote the Repo

### In README
Add badges:
```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Issues](https://img.shields.io/github/issues/eu-ai-operator/desk)](https://github.com/eu-ai-operator/desk/issues)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen)](CONTRIBUTING.md)
```

### Social & Communities
- **Bulgarian AI communities**: INSAIT, BRAIN++, BgGPT
- **European platforms**: EU Commission digital initiatives, EdTech forums
- **Hardware communities**: Tom's Hardware Bulgaria, Linus Tech Tips EU
- **Diaspora networks**: LinkedIn groups, professional associations

### LinkedIn Post Example
> We just launched **EU AI Operator's Desk** — a public resource bridging strategic market intelligence with hands-on deployment guidance for European AI adopters. Combines Bulgarian GCE AI strategy + hardware configuration in one unified platform. 
>
> Features: PESTEL analysis, hardware configs, 90-day roadmaps, regional insights
>
> Open source, community-driven. Contributions welcome: market data, hardware specs, case studies, translations
>
> 🔗 github.com/eu-ai-operator/desk

---

## Step 7: First Contributors

Invite for early feedback & contributions:
- **Market research**: INSAIT, BRAIN++, Bulgarian Institute for Strategic Studies
- **Hardware expertise**: Regional tech shops, system integrators
- **Regional SMEs**: Founders using local AI for their businesses
- **Educators**: Universities teaching AI development and deployment

---

## Step 8: Continuous Deployment

The `.github/workflows/deploy.yml` workflow will automatically:
1. Run `pnpm build` on every push to `main`
2. Deploy the `dist/` folder to GitHub Pages
3. Make the site live at `https://YOUR_USERNAME.github.io/desk/`

---

## Step 9: Domain Setup (Optional)

Once ready for public, register a domain (e.g., `eu-ai-desk.com`):
1. Register domain via registrar (Namecheap, GoDaddy, etc.)
2. In GitHub Settings → Pages, add custom domain
3. Update DNS records to point to GitHub Pages

---

## Next Steps After Launch

- Merge original strategy analysis from Bulgarian project
- Integrate MegaAgent hardware data
- Start community contributions
- Track feedback via GitHub Issues
- Iterate roadmap based on demand

---

**Checklist before first push:**
- [x] App.tsx router configured
- [x] Home, Strategy, Hardware, About pages created
- [x] README.md comprehensive
- [x] CONTRIBUTING.md clear
- [x] .env.example provided
- [x] GitHub workflow ready
- [ ] Local build tested (when pnpm available)
- [ ] GitHub repo created
- [ ] First push complete
- [ ] Pages deployment live
