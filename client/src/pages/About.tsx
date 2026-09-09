/**
 * About Page
 */
import { useLocation } from "wouter";
import { ChevronLeft, Github, Mail } from "lucide-react";

export default function About() {
  const [, navigate] = useLocation();

  return (
    <div className="about-page-wrapper">
      <header className="about-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <ChevronLeft size={18} /> Back to desk
        </button>
        <h1>About EU AI Operator's Desk</h1>
      </header>

      <main className="about-content">
        <article className="about-card">
          <h2>What is this?</h2>
          <p>
            EU AI Operator's Desk is a public resource designed for founders, SMEs, educators, and operators navigating Europe's AI adoption opportunity. It bridges strategic market intelligence with hands-on deployment guidance.
          </p>
        </article>

        <article className="about-card">
          <h2>Why now?</h2>
          <p>
            European AI adoption lags (8.5% in Bulgaria vs. 20% EU average). The gap is not technology—it's integration, trust, and regional guidance. This desk closes that gap by combining:
          </p>
          <ul className="about-list">
            <li>
              <strong>Strategic Intelligence</strong> — PESTEL analysis, competitive pressure, business models, and 90-day validation roadmaps for the European market.
            </li>
            <li>
              <strong>Hardware Guidance</strong> — A ruled configurator for building coherent local AI workstations without promo noise.
            </li>
            <li>
              <strong>Evidence Discipline</strong> — Verified sources, directional hypotheses, and explicit next-proof steps. No confidence tricks.
            </li>
          </ul>
        </article>

        <article className="about-card">
          <h2>Who built this?</h2>
          <p>
            Started as a merger of two focused projects:
            <br />
            • <strong>Bulgarian GCE AI Strategy</strong> — Regional market analysis with evidence-led research
            <br />
            • <strong>MegaAgent PC Studio</strong> — Hardware configuration ledger for private compute
            <br />
            Now unified as a public EU-focused resource.
          </p>
        </article>

        <article className="about-card">
          <h2>How to use it</h2>
          <div className="usage-steps">
            <div className="step">
              <strong>1. Strategic Atlas</strong>
              <p>Explore market opportunity, competitive pressure, and go-to-market design for your region and audience.</p>
            </div>
            <div className="step">
              <strong>2. Hardware Desk</strong>
              <p>Configure a private AI workstation sized for your strategy. Check compatibility, export your build.</p>
            </div>
            <div className="step">
              <strong>3. Ship & Iterate</strong>
              <p>Deploy pilots, measure outcomes, refine your offer based on real workflows.</p>
            </div>
          </div>
        </article>

        <article className="about-card contribute">
          <h2>Contribute</h2>
          <p>This is open source and community-driven. Help improve strategy, hardware guidance, regional analysis, or deployment patterns.</p>
          <div className="contribute-buttons">
            <a href="https://github.com/eu-ai-operator/desk" target="_blank" rel="noreferrer" className="contrib-btn">
              <Github size={18} /> Fork on GitHub
            </a>
            <a href="mailto:hello@eu-ai-desk.com" className="contrib-btn">
              <Mail size={18} /> Send feedback
            </a>
          </div>
        </article>
      </main>

      <style>{`
        .about-page-wrapper {
          background: #faf9f7;
          min-height: 100vh;
        }

        .about-header {
          background: white;
          padding: 2rem;
          border-bottom: 1px solid #e5ddd2;
          max-width: 1000px;
          margin: 0 auto;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #10212b;
          font-weight: 600;
          margin-bottom: 1rem;
          transition: all 200ms ease-out;
        }

        .back-btn:hover {
          transform: translateX(-4px);
        }

        .about-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .about-content {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 2rem;
        }

        .about-card {
          background: white;
          padding: 2rem;
          margin-bottom: 2rem;
          border-radius: 8px;
          border: 1px solid #e5ddd2;
          line-height: 1.6;
        }

        .about-card h2 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .about-card p {
          color: #555;
          margin-bottom: 1rem;
        }

        .about-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .about-list li {
          padding-left: 1.5rem;
          color: #555;
          position: relative;
        }

        .about-list li:before {
          content: "→";
          position: absolute;
          left: 0;
          color: #E06B3C;
          font-weight: 600;
        }

        .usage-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .step {
          background: #f9f8f5;
          padding: 1.5rem;
          border-radius: 6px;
          border-left: 3px solid #E06B3C;
        }

        .step strong {
          color: #E06B3C;
        }

        .step p {
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        .contribute {
          background: linear-gradient(135deg, rgba(224, 107, 60, 0.05) 0%, rgba(43, 85, 255, 0.05) 100%);
          border: 1px solid rgba(224, 107, 60, 0.2);
        }

        .contribute-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .contrib-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #10212b;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: all 200ms ease-out;
        }

        .contrib-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
