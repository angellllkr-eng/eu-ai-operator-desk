/**
 * Strategic Market Atlas
 * EU AI opportunity analysis, competitive intelligence, and go-to-market design
 */
import { useLocation } from "wouter";
import { ChevronLeft } from "lucide-react";

export default function StrategicAtlas() {
  const [, navigate] = useLocation();

  return (
    <div className="atlas-page-wrapper">
      <header className="atlas-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <ChevronLeft size={18} /> Back to desk
        </button>
        <h1>Strategic Market Atlas</h1>
        <p>European AI adoption strategy, competitive landscape, and evidence-driven market intelligence.</p>
      </header>

      <main className="atlas-content">
        <div className="placeholder-content">
          <h2>🏗️ Strategic Atlas (In Development)</h2>
          <p>
            This section combines evidence-led analysis of European AI adoption opportunities with regional market intelligence, competitive pressure mapping, and go-to-market frameworks.
          </p>
          <div className="feature-list">
            <h3>Core Features:</h3>
            <ul>
              <li>✓ PESTEL + Five Forces analysis</li>
              <li>✓ Portfolio scan with evidence confidence labels (Verified / Directional / Unverified)</li>
              <li>✓ Business model canvas for regional operators</li>
              <li>✓ 7Ps go-to-market framework</li>
              <li>✓ 90-day validation roadmap</li>
              <li>✓ Evidence ledger and source citations</li>
            </ul>
          </div>
          <button onClick={() => window.history.back()} className="btn-secondary">
            Explore existing Bulgarian strategy analysis →
          </button>
        </div>
      </main>

      <style>{`
        .atlas-page-wrapper {
          background: #faf9f7;
          min-height: 100vh;
        }

        .atlas-header {
          background: white;
          padding: 2rem;
          border-bottom: 1px solid #e5ddd2;
          max-width: 1200px;
          margin: 0 auto;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #E06B3C;
          font-weight: 600;
          margin-bottom: 1rem;
          transition: all 200ms ease-out;
        }

        .back-btn:hover {
          transform: translateX(-4px);
        }

        .atlas-header h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .atlas-header p {
          color: #666;
          font-size: 0.95rem;
        }

        .atlas-content {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 2rem;
        }

        .placeholder-content {
          background: white;
          padding: 3rem;
          border-radius: 8px;
          border: 1px solid #e5ddd2;
        }

        .placeholder-content h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .placeholder-content p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .feature-list h3 {
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .feature-list ul {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .feature-list li {
          padding: 0.75rem;
          background: #f9f8f5;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .btn-secondary {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: #10212b;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 200ms ease-out;
        }

        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
