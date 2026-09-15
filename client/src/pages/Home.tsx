import { useLocation } from "wouter";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Cpu,
  FileCheck2,
  Globe2,
  Layers3,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const useCases = [
  {
    icon: Sparkles,
    title: "AI adoption qualification",
    copy: "Turn an early AI idea into a scoped wedge, target segment, evidence set, and 90-day validation path.",
  },
  {
    icon: FileCheck2,
    title: "AI Act readiness",
    copy: "Map a proposed AI use case to the right evidence, ownership, deployment context, and next compliance questions.",
  },
  {
    icon: Cpu,
    title: "Private compute design",
    copy: "Translate workload requirements into a coherent workstation or private-lab configuration with explicit trade-offs.",
  },
  {
    icon: Globe2,
    title: "EU market expansion",
    copy: "Compare countries, sectors, partners, procurement paths, and regional opportunity before committing execution budget.",
  },
  {
    icon: Workflow,
    title: "Operator handoff",
    copy: "Package a qualified opportunity for the execution layer instead of forcing strategy, billing, and infrastructure into one app.",
  },
  {
    icon: CircleDollarSign,
    title: "Commercial qualification",
    copy: "Define the offer, commercial assumptions, and approval point before routing work into checkout or execution workflows.",
  },
];

const handoffs = [
  ["1", "Discover", "Market, sector, workload, and deployment context"],
  ["2", "Qualify", "Evidence, confidence, economics, and constraints"],
  ["3", "Design", "Strategy path, compute profile, and recommended next move"],
  ["4", "Approve", "Human owner reviews irreversible or paid actions"],
  ["5", "Execute", "MindReply / MRdash becomes the control and workflow layer"],
  ["6", "Record", "Decision, receipt, outcome, and evidence return to the ledger"],
];

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="desk-shell">
      <style>{`
        :root { color-scheme: light; }
        * { box-sizing: border-box; }
        body { margin: 0; background: #f7f8fa; }
        .desk-shell { min-height: 100vh; color: #17202a; background: linear-gradient(180deg,#f8fafc 0%,#f5f1ea 100%); font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
        .topbar { position: sticky; top: 0; z-index: 20; display:flex; justify-content:space-between; gap:24px; align-items:center; padding:16px 28px; backdrop-filter: blur(18px); background: rgba(248,250,252,.88); border-bottom:1px solid rgba(23,32,42,.08); }
        .brand { display:flex; align-items:center; gap:12px; }
        .brand-mark { width:40px; height:40px; border-radius:12px; display:grid; place-items:center; background:#17202a; color:#fff; font-weight:800; font-size:12px; letter-spacing:.04em; }
        .brand-copy strong { display:block; font-size:15px; }
        .brand-copy span { display:block; margin-top:2px; color:#68737e; font-size:12px; }
        .nav { display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end; }
        .nav button { border:0; background:transparent; color:#42505d; padding:9px 12px; border-radius:9px; cursor:pointer; font-weight:600; }
        .nav button:hover { background:#e9edf2; color:#17202a; }
        .page { max-width:1240px; margin:0 auto; padding:28px; }
        .hero { display:grid; grid-template-columns:1.2fr .8fr; gap:24px; align-items:stretch; padding:34px; border:1px solid #dde3e8; border-radius:24px; background:rgba(255,255,255,.82); box-shadow:0 24px 70px rgba(25,35,45,.08); }
        .eyebrow { display:inline-flex; align-items:center; gap:8px; padding:7px 10px; border-radius:999px; background:#eef2ff; color:#3b4bc2; font-size:12px; font-weight:800; letter-spacing:.04em; text-transform:uppercase; }
        h1 { font-size:clamp(38px,6vw,68px); line-height:.98; letter-spacing:-.045em; margin:18px 0; max-width:760px; }
        .lead { max-width:720px; color:#56616d; font-size:18px; line-height:1.6; }
        .actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:24px; }
        .primary,.secondary { display:inline-flex; align-items:center; gap:9px; padding:12px 16px; border-radius:11px; font-weight:750; cursor:pointer; }
        .primary { border:1px solid #17202a; background:#17202a; color:#fff; }
        .secondary { border:1px solid #cfd7de; background:#fff; color:#17202a; }
        .primary:hover,.secondary:hover { transform:translateY(-1px); }
        .hero-panel { border-radius:18px; padding:20px; background:#17202a; color:#fff; min-height:320px; display:flex; flex-direction:column; justify-content:space-between; }
        .panel-label { color:#aeb8c2; font-size:12px; text-transform:uppercase; letter-spacing:.08em; font-weight:800; }
        .signal { margin-top:12px; font-size:34px; line-height:1.05; letter-spacing:-.03em; }
        .signal-copy { color:#c6ced6; line-height:1.55; margin-top:12px; }
        .signal-list { display:grid; gap:9px; margin-top:24px; }
        .signal-item { display:flex; gap:10px; align-items:flex-start; padding:10px 0; border-top:1px solid rgba(255,255,255,.1); }
        .signal-item svg { flex:0 0 auto; margin-top:2px; }
        .section { margin-top:26px; }
        .section-head { display:flex; justify-content:space-between; gap:20px; align-items:flex-end; margin-bottom:14px; }
        .section-head h2 { margin:0; font-size:27px; letter-spacing:-.03em; }
        .section-head p { margin:0; color:#68737e; max-width:700px; line-height:1.5; }
        .grid { display:grid; gap:14px; grid-template-columns:repeat(3,minmax(0,1fr)); }
        .card { background:#fff; border:1px solid #dde3e8; border-radius:18px; padding:18px; box-shadow:0 8px 25px rgba(25,35,45,.04); }
        .card-icon { width:40px; height:40px; border-radius:11px; display:grid; place-items:center; background:#eef2f7; color:#273443; }
        .card h3 { margin:14px 0 7px; font-size:17px; }
        .card p { margin:0; color:#64707b; line-height:1.55; font-size:14px; }
        .flow { display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); gap:10px; }
        .flow-step { min-height:150px; padding:16px; background:#fff; border:1px solid #dde3e8; border-radius:16px; }
        .num { display:inline-grid; place-items:center; width:28px; height:28px; border-radius:9px; background:#17202a; color:#fff; font-weight:800; font-size:12px; }
        .flow-step strong { display:block; margin-top:12px; }
        .flow-step span:last-child { display:block; margin-top:6px; color:#66727e; font-size:13px; line-height:1.45; }
        .platform { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .platform-card { padding:22px; border-radius:18px; border:1px solid #dde3e8; background:linear-gradient(135deg,#fff 0%,#f9fafc 100%); }
        .platform-card h3 { margin:0 0 8px; font-size:19px; display:flex; align-items:center; gap:8px; }
        .platform-card p { margin:0; color:#66727e; line-height:1.55; }
        .platform-tags { display:flex; flex-wrap:wrap; gap:8px; margin-top:16px; }
        .tag { padding:7px 9px; border-radius:999px; border:1px solid #dce2e8; background:#fff; color:#485461; font-size:12px; font-weight:700; }
        .trust { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; }
        .trust-item { display:flex; gap:10px; align-items:flex-start; padding:16px; background:#f0f5f2; border:1px solid #d6e2dc; border-radius:16px; }
        .trust-item strong { display:block; font-size:14px; }
        .trust-item span { display:block; color:#5f6d66; font-size:13px; margin-top:4px; line-height:1.45; }
        .footer { margin-top:30px; padding:24px 0 12px; color:#74808b; font-size:13px; display:flex; justify-content:space-between; gap:20px; border-top:1px solid #dde3e8; }
        .footer a { color:#3d4aa9; text-decoration:none; }
        @media (max-width: 980px) { .hero,.platform { grid-template-columns:1fr; } .grid { grid-template-columns:repeat(2,minmax(0,1fr)); } .flow { grid-template-columns:repeat(3,minmax(0,1fr)); } .trust { grid-template-columns:1fr; } }
        @media (max-width: 680px) { .topbar { align-items:flex-start; flex-direction:column; } .page { padding:16px; } .hero { padding:22px; } .grid,.flow { grid-template-columns:1fr; } h1 { font-size:44px; } .footer { flex-direction:column; } }
      `}</style>

      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">EU AI</div>
          <div className="brand-copy">
            <strong>EU AI Operator’s Desk</strong>
            <span>Evidence → qualification → deployment handoff</span>
          </div>
        </div>
        <nav className="nav" aria-label="Primary">
          <button onClick={() => navigate("/strategy")}>Strategic Atlas</button>
          <button onClick={() => navigate("/hardware")}>Compute Desk</button>
          <button onClick={() => navigate("/about")}>About</button>
        </nav>
      </header>

      <main className="page">
        <section className="hero">
          <div>
            <span className="eyebrow"><ShieldCheck size={14} /> European AI operating desk</span>
            <h1>Make the next AI move with evidence.</h1>
            <p className="lead">
              Qualify an AI opportunity, understand the EU context, design the right compute profile, and hand a decision into an execution layer without losing the evidence that justified it.
            </p>
            <div className="actions">
              <button className="primary" onClick={() => navigate("/strategy")}>Open the Strategic Atlas <ArrowRight size={16} /></button>
              <button className="secondary" onClick={() => navigate("/hardware")}>Design private compute <Cpu size={16} /></button>
            </div>
          </div>

          <aside className="hero-panel">
            <div>
              <div className="panel-label">Operator model</div>
              <div className="signal">Research first.<br />Commit second.</div>
              <div className="signal-copy">The Desk is the qualification layer. MindReply can become the execution and control layer after the owner approves the move.</div>
            </div>
            <div className="signal-list">
              <div className="signal-item"><CheckCircle2 size={16} /><span>Evidence confidence stays explicit.</span></div>
              <div className="signal-item"><CheckCircle2 size={16} /><span>Commercial and paid actions stay gated.</span></div>
              <div className="signal-item"><CheckCircle2 size={16} /><span>Outputs can be handed to another platform.</span></div>
            </div>
          </aside>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <h2>What this site is for</h2>
              <p>Six concrete jobs make the Desk useful immediately. More can sit behind the same evidence and handoff model later.</p>
            </div>
          </div>
          <div className="grid">
            {useCases.map(({ icon: Icon, title, copy }) => (
              <article className="card" key={title}>
                <div className="card-icon"><Icon size={19} /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <h2>One operating path</h2>
              <p>Keep the public research surface lightweight. Push execution, authentication, payments, automation, and audit deeper into the stack.</p>
            </div>
          </div>
          <div className="flow">
            {handoffs.map(([number, title, copy]) => (
              <div className="flow-step" key={number}>
                <span className="num">{number}</span>
                <strong>{title}</strong>
                <span>{copy}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section platform">
          <div className="platform-card">
            <h3><Layers3 size={18} /> Desk → execution layer</h3>
            <p>The public site qualifies the opportunity. A future API contract can pass a structured decision into MindReply / MRdash for workflows, approvals, deployment, monitoring, and evidence receipts.</p>
            <div className="platform-tags"><span className="tag">MindReply</span><span className="tag">MRdash</span><span className="tag">GitHub</span><span className="tag">Vercel / edge</span></div>
          </div>
          <div className="platform-card">
            <h3><Building2 size={18} /> Data → commercial layer</h3>
            <p>Supabase/Postgres can become the system of record; Stripe can handle commercial transactions; reconciliation and exposure review can be connected later without embedding credentials into the public client.</p>
            <div className="platform-tags"><span className="tag">Supabase</span><span className="tag">Stripe</span><span className="tag">Links Connect</span><span className="tag">Soluvery</span></div>
          </div>
        </section>

        <section className="section trust">
          <div className="trust-item"><CheckCircle2 size={18} /><div><strong>Evidence-led</strong><span>Source provenance and confidence stay visible instead of turning assumptions into facts.</span></div></div>
          <div className="trust-item"><CheckCircle2 size={18} /><div><strong>Owner-controlled</strong><span>No automatic paid or irreversible execution should happen just because a recommendation exists.</span></div></div>
          <div className="trust-item"><CheckCircle2 size={18} /><div><strong>Platform-neutral</strong><span>The Desk can inform MindReply, another operator, or a human decision without becoming a lock-in layer.</span></div></div>
        </section>

        <footer className="footer">
          <div>EU AI Operator’s Desk — public qualification surface for European AI adoption.</div>
          <div><a href="https://github.com/angellllkr-eng/eu-ai-operator-desk" target="_blank" rel="noreferrer">GitHub</a> · <a href="https://mind-reply.com" target="_blank" rel="noreferrer">MindReply execution layer</a></div>
        </footer>
      </main>
    </div>
  );
}
