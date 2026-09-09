/**
 * Private Compute Hardware Builder
 * EU-focused workstation configuration for local AI deployment
 */
import { useLocation } from "wouter";
import { ChevronLeft } from "lucide-react";

export default function HardwareBuilder() {
  const [, navigate] = useLocation();

  return (
    <div className="hardware-page-wrapper">
      <header className="hardware-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <ChevronLeft size={18} /> Back to desk
        </button>
        <h1>Private Compute Configurator</h1>
        <p>Build a coherent local AI workstation: focused desk, parallel multi-agent, or enterprise private lab.</p>
      </header>

      <main className="hardware-content">
        <div className="placeholder-content">
          <h2>⚙️ Hardware Configurator (In Development)</h2>
          <p>
            Configure a private AI workstation by choosing from curated components. Real-time compatibility checking, cost tracking, and direct retailer routing.
          </p>
          <div className="config-modes">
            <h3>Operating Modes:</h3>
            <div className="mode-grid">
              <div className="mode-card">
                <strong>Focused Desk</strong>
                <p>Quiet single-operator: 16GB GPU, moderate CPU, lean stack</p>
              </div>
              <div className="mode-card">
                <strong>Parallel Multi-Agent</strong>
                <p>Multiple concurrent tasks: 32GB GPU, 16C CPU, 128GB RAM</p>
              </div>
              <div className="mode-card">
                <strong>Enterprise Lab</strong>
                <p>Local models + services: 96GB GPU, 32C CPU, 256GB RAM, ECC</p>
              </div>
            </div>
          </div>
          <div className="component-guide">
            <h3>Guided Choices:</h3>
            <ul>
              <li>CPU → GPU (VRAM is the constraint, not feature count)</li>
              <li>Motherboard (platform lock: AM5, LGA1851, sTR5)</li>
              <li>Memory (working set for parallel tasks)</li>
              <li>Storage (fast local models + project data)</li>
              <li>Cooling (thermal posture for sustained work)</li>
              <li>Case (GPU clearance, airflow, aesthetics)</li>
              <li>Power (headroom, not peak draw)</li>
            </ul>
          </div>
          <button onClick={() => window.history.back()} className="btn-secondary">
            Explore existing MegaAgent configurator →
          </button>
        </div>
      </main>

      <style>{`
        .hardware-page-wrapper {
          background: #faf9f7;
          min-height: 100vh;
        }

        .hardware-header {
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
          color: #2B55FF;
          font-weight: 600;
          margin-bottom: 1rem;
          transition: all 200ms ease-out;
        }

        .back-btn:hover {
          transform: translateX(-4px);
        }

        .hardware-header h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .hardware-header p {
          color: #666;
          font-size: 0.95rem;
        }

        .hardware-content {
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

        .config-modes h3,
        .component-guide h3 {
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .mode-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .mode-card {
          padding: 1.5rem;
          background: linear-gradient(135deg, rgba(43, 85, 255, 0.05) 0%, rgba(43, 85, 255, 0.02) 100%);
          border: 1px solid rgba(43, 85, 255, 0.2);
          border-radius: 6px;
        }

        .mode-card strong {
          display: block;
          margin-bottom: 0.5rem;
          color: #2B55FF;
        }

        .mode-card p {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.5;
        }

        .component-guide ul {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .component-guide li {
          padding: 1rem;
          background: #f9f8f5;
          border-left: 3px solid #2B55FF;
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
