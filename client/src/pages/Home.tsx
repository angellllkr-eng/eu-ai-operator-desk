/**
 * EU AI Operator's Desk — Landing Page
 * Bridge between strategic market intelligence and hands-on deployment
 */
import { useLocation } from "wouter";
import { ArrowRight, Sparkles, Target, Building2, Zap, Globe2 } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="eu-operator-shell">
      <header className="eu-header">
        <div className="header-brand">
          <div className="brand-mark">EU AI</div>
          <span>
            <strong>Operator's Desk</strong>
            <em>Evidence-led deployment for European AI adopters</em>
          </span>
        </div>
        <nav className="header-nav">
          <button onClick={() => navigate("/strategy")}>Strategic atlas</button>
          <button onClick={() => navigate("/hardware")}>Hardware desk</button>
          <button onClick={() => navigate("/about")}>About</button>
        </nav>
      </header>

      <main className="eu-main">
        {/* Hero */}
        <section className="hero-section">
          <div className="hero-left">
            <h1>Build local AI capability with confidence.</h1>
            <p>
              The gap between European AI adoption and opportunity is not infrastructure—it's visibility, integration, and trusted guidance. EU AI Operator's Desk
              bridges strategic market intelligence with hands-on hardware configuration for founders, SMEs, educators, and operators.
            </p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => navigate("/strategy")}>
                Explore market opportunity <ArrowRight size={16} />
              </button>
              <button className="secondary-action" onClick={() => navigate("/hardware")}>
                Start a workstation build
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-grid">
              <div className="grid-item strategy">
                <Sparkles size={24} />
                <strong>Strategy</strong>
              </div>
              <div className="grid-item hardware">
                <Zap size={24} />
                <strong>Hardware</strong>
              </div>
              <div className="grid-item evidence">
                <Target size={24} />
                <strong>Evidence</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Two Desks */}
        <section className="desks-section">
          <article className="desk-card atlas-desk">
            <div className="desk-icon"><Sparkles size={28} /></div>
            <h2>Strategic Market Atlas</h2>
            <p>Regional opportunity analysis, competitive pressure, business models, and 90-day validation roadmaps for the European AI market.</p>
            <div className="desk-features">
              <span>✓ PESTEL + Five Forces</span>
              <span>✓ Portfolio scan with evidence confidence</span>
              <span>✓ Go-to-market design (7Ps)</span>
              <span>✓ 90-day proof roadmap</span>
            </div>
            <button className="desk-action" onClick={() => navigate("/strategy")}>
              Open the atlas <ArrowRight size={15} />
            </button>
          </article>

          <article className="desk-card command-desk">
            <div className="desk-icon"><Zap size={28} /></div>
            <h2>Private Compute Configurator</h2>
            <p>A ruled component ledger for building coherent local-AI workstations: focused desktop, parallel multi-agent, or enterprise private lab.</p>
            <div className="desk-features">
              <span>✓ Component trade-off clarity</span>
              <span>✓ Real-time compatibility check</span>
              <span>✓ Platform alignment (AM5 / LGA1851 / sTR5)</span>
              <span>✓ Retailer routing + build export</span>
            </div>
            <button className="desk-action" onClick={() => navigate("/hardware")}>
              Build a machine <ArrowRight size={15} />
            </button>
          </article>
        </section>

        {/* EU Markets */}
        <section className="markets-section">
          <h2>Unlocking EU opportunity</h2>
          <p>
            Europe's AI adoption gap (8.5% in Bulgaria vs. 20% EU average) is a design problem, not a technology problem. Successful deployment depends on regional trust, integration paths, and hands-on enablement.
          </p>
          <div className="market-grid">
            <div className="market-item">
              <Globe2 size={20} />
              <strong>Regional focus</strong>
              <p>Bulgaria, diaspora, and cross-border workflows</p>
            </div>
            <div className="market-item">
              <Building2 size={20} />
              <strong>Segment clarity</strong>
              <p>SMEs, educators, public services, associations</p>
            </div>
            <div className="market-item">
              <Target size={20} />
              <strong>Evidence-led</strong>
              <p>Verified sources, directional hypotheses, next-proof steps</p>
            </div>
            <div className="market-item">
              <Zap size={20} />
              <strong>Action-oriented</strong>
              <p>From 90-day roadmaps to real hardware rigs</p>
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="integration-section">
          <h2>Strategy meets silicon</h2>
          <p>
            Choose a market opportunity on the Strategic Atlas. Then move to the Hardware Desk to configure the infrastructure that brings that strategy to life—whether it's a quiet operator's desk, a parallel-agent workstation, or an enterprise private lab.
          </p>
          <div className="integration-flow">
            <div className="flow-step">
              <span className="flow-number">1</span>
              <strong>Market strategy</strong>
              <p>Define your wedge, audience, and 90-day validation path</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <span className="flow-number">2</span>
              <strong>Hardware design</strong>
              <p>Size the GPU, memory, and compute for your workload</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <span className="flow-number">3</span>
              <strong>Ship & iterate</strong>
              <p>Deploy pilots, measure outcomes, refine the offer</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="eu-footer">
        <div>
          <strong>EU AI Operator's Desk</strong>
          <p>Evidence-led deployment guidance for European AI adopters.</p>
        </div>
        <div>
          <strong>Public resource</strong>
          <p>
            Open-source, maintained by a community of founders, researchers, and operators. <a href="https://github.com/eu-ai-operator/desk">Contribute on GitHub</a>.
          </p>
        </div>
      </footer>

      <style>{`
        .eu-operator-shell {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #faf9f7;
          color: #10212b;
        }

        .eu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: white;
          border-bottom: 1px solid #e5ddd2;
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 600;
        }

        .brand-mark {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #E06B3C 0%, #2B55FF 100%);
          color: white;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 700;
        }

        .header-brand strong {
          display: block;
          font-size: 0.95rem;
        }

        .header-brand em {
          display: block;
          font-size: 0.75rem;
          font-style: normal;
          color: #666;
        }

        .header-nav {
          display: flex;
          gap: 2rem;
        }

        .header-nav button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
          color: #10212b;
          padding: 0.5rem 0;
          border-bottom: 2px solid transparent;
          transition: border-color 200ms ease-out;
        }

        .header-nav button:hover {
          border-color: #E06B3C;
        }

        .eu-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          margin-bottom: 4rem;
          padding: 3rem;
          background: white;
          border-radius: 8px;
          border: 1px solid #e5ddd2;
        }

        .hero-left h1 {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1rem;
          color: #10212b;
        }

        .hero-left p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #555;
          margin-bottom: 2rem;
        }

        .hero-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .primary-action,
        .secondary-action {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 200ms ease-out;
        }

        .primary-action {
          background: linear-gradient(135deg, #E06B3C 0%, #d15a2c 100%);
          color: white;
        }

        .primary-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(224, 107, 60, 0.3);
        }

        .secondary-action {
          background: transparent;
          color: #10212b;
          border: 2px solid #10212b;
        }

        .secondary-action:hover {
          background: #f0f0f0;
        }

        .visual-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          grid-template-rows: auto auto;
        }

        .grid-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          border-radius: 8px;
          gap: 0.75rem;
          font-weight: 600;
          color: white;
        }

        .grid-item.strategy {
          background: linear-gradient(135deg, #E06B3C 0%, #d15a2c 100%);
          grid-column: 1;
          grid-row: 1 / 3;
        }

        .grid-item.hardware {
          background: linear-gradient(135deg, #2B55FF 0%, #1a35d9 100%);
        }

        .grid-item.evidence {
          background: linear-gradient(135deg, #4E8078 0%, #3d6a60 100%);
        }

        .desks-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .desk-card {
          background: white;
          border: 1px solid #e5ddd2;
          border-radius: 8px;
          padding: 2rem;
          transition: all 200ms ease-out;
        }

        .desk-card:hover {
          border-color: #E06B3C;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .desk-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .atlas-desk .desk-icon {
          background: rgba(224, 107, 60, 0.1);
          color: #E06B3C;
        }

        .command-desk .desk-icon {
          background: rgba(43, 85, 255, 0.1);
          color: #2B55FF;
        }

        .desk-card h2 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .desk-card p {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #666;
          margin-bottom: 1.5rem;
        }

        .desk-features {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
          color: #555;
        }

        .desk-action {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #10212b;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 200ms ease-out;
        }

        .desk-action:hover {
          transform: translateX(4px);
        }

        .markets-section {
          text-align: center;
          margin-bottom: 4rem;
          padding: 3rem;
          background: white;
          border-radius: 8px;
          border: 1px solid #e5ddd2;
        }

        .markets-section h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .markets-section > p {
          font-size: 0.95rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .market-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }

        .market-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          text-align: center;
        }

        .market-item svg {
          color: #E06B3C;
        }

        .market-item strong {
          font-size: 0.95rem;
        }

        .market-item p {
          font-size: 0.85rem;
          color: #666;
          line-height: 1.5;
        }

        .integration-section {
          text-align: center;
          margin-bottom: 4rem;
          padding: 3rem;
          background: linear-gradient(135deg, rgba(224, 107, 60, 0.05) 0%, rgba(43, 85, 255, 0.05) 100%);
          border-radius: 8px;
          border: 1px solid #e5ddd2;
        }

        .integration-section h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .integration-section > p {
          font-size: 0.95rem;
          color: #666;
          max-width: 700px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .integration-flow {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .flow-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          max-width: 200px;
        }

        .flow-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: #E06B3C;
          color: white;
          border-radius: 50%;
          font-weight: 700;
        }

        .flow-step strong {
          font-size: 0.95rem;
        }

        .flow-step p {
          font-size: 0.85rem;
          color: #666;
          line-height: 1.5;
        }

        .flow-arrow {
          font-size: 1.5rem;
          color: #ccc;
        }

        .eu-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          padding: 3rem 2rem;
          background: #10212b;
          color: #f4efe6;
          margin-top: 4rem;
        }

        .eu-footer strong {
          display: block;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .eu-footer p {
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(244, 239, 230, 0.7);
        }

        .eu-footer a {
          color: #E06B3C;
          text-decoration: none;
          font-weight: 600;
        }

        .eu-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1.5rem;
          }

          .desks-section,
          .market-grid,
          .eu-footer {
            grid-template-columns: 1fr;
          }

          .visual-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }

          .grid-item.strategy {
            grid-column: auto;
            grid-row: auto;
          }
        }
      `}</style>
    </div>
  );
}
