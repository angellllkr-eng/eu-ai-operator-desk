/**
 * Strategic Atlas — Market Intelligence Page
 * Modern Sept 2026 design: clean, hierarchical, evidence-driven
 */
import { useLocation } from "wouter";
import { Sparkles, TrendingUp, Target, BookOpen, Calendar, Award } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Section from "@/components/Section";
import CardGrid, { Card } from "@/components/CardGrid";
import { colors, spacing } from "@/lib/designSystem";

export default function StrategicAtlas() {
  const [, navigate] = useLocation();

  const frameworks = [
    {
      title: "PESTEL Analysis",
      description: "Political, Economic, Social, Technological, Environmental, Legal context for EU markets",
      icon: "📊",
      features: ["Regulatory landscape", "Market timing", "Competitive dynamics"],
    },
    {
      title: "Five Forces",
      description: "Porter's framework: competitive intensity, buyer/supplier power, substitutes, entrants",
      icon: "⚡",
      features: ["Bargaining power", "Threat assessment", "Margin analysis"],
    },
    {
      title: "Business Model Canvas",
      description: "Value proposition, revenue streams, key partnerships, cost structure",
      icon: "🎯",
      features: ["Revenue design", "Customer journey", "Unit economics"],
    },
    {
      title: "7Ps Go-to-Market",
      description: "Product, Price, Place, Promotion, People, Process, Physical Evidence",
      icon: "🚀",
      features: ["Market positioning", "Sales strategy", "Brand presence"],
    },
    {
      title: "90-Day Roadmap",
      description: "Validation path from strategy to proof: milestones, metrics, pivots",
      icon: "📅",
      features: ["Quick wins", "Risk mitigation", "Measurement framework"],
    },
    {
      title: "Evidence Ledger",
      description: "Verified sources, directional hypotheses, confidence levels on all claims",
      icon: "✓",
      features: ["Source citation", "Transparency", "Accountability"],
    },
  ];

  const regions = [
    {
      name: "Bulgaria",
      adoption: "8.5%",
      opportunity: "Diaspora networks, public sector digitalization, SME enablement",
    },
    {
      name: "Poland",
      adoption: "14%",
      opportunity: "Tech talent density, startup ecosystem, fintech maturity",
    },
    {
      name: "Germany",
      adoption: "19%",
      opportunity: "Enterprise scale, industrial AI (Mittelstand), compliance leadership",
    },
    {
      name: "France",
      adoption: "18%",
      opportunity: "Academic research, defense tech, EU regulatory influence",
    },
  ];

  return (
    <PageLayout
      mode="strategy"
      title="Strategic Market Atlas"
      subtitle="Evidence-led market intelligence for European AI adoption"
      actions={
        <button
          onClick={() => navigate("/hardware")}
          style={{
            background: colors.strategy.primary,
            color: "white",
            border: "none",
            padding: `${spacing.sm} ${spacing.md}`,
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Go to Hardware →
        </button>
      }
    >
      {/* Hero */}
      <Section
        title="Understanding the European AI Adoption Gap"
        description="8.5% of Bulgarian enterprises use AI vs. 20% EU average. The gap is not technology—it's visibility, integration, and trusted guidance."
        centered
        background={`linear-gradient(135deg, ${colors.strategy.light} 0%, ${colors.strategy.primary}08 100%)`}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: spacing.lg,
            marginTop: spacing.xl,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: spacing.sm }}>🎯</div>
            <strong>Market Clarity</strong>
            <p style={{ fontSize: "0.85rem", color: colors.neutral.muted }}>
              Regional specificity over generic platforms
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: spacing.sm }}>🔗</div>
            <strong>Integration Paths</strong>
            <p style={{ fontSize: "0.85rem", color: colors.neutral.muted }}>
              From strategy to silicon, seamlessly
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: spacing.sm }}>✓</div>
            <strong>Evidence Discipline</strong>
            <p style={{ fontSize: "0.85rem", color: colors.neutral.muted }}>
              Verified sources, transparent reasoning
            </p>
          </div>
        </div>
      </Section>

      {/* Analysis Frameworks */}
      <Section
        title="Analysis Frameworks"
        description="Six complementary lenses for market intelligence, strategy design, and validation"
        mode="strategy"
      >
        <CardGrid columns={3}>
          {frameworks.map((f, i) => (
            <Card
              key={i}
              mode="strategy"
              title={f.title}
              description={f.description}
              features={f.features}
              icon={f.icon}
            />
          ))}
        </CardGrid>
      </Section>

      {/* Regional Market Data */}
      <Section
        title="Regional Adoption Landscape"
        description="Current AI adoption rates and market opportunity by country"
        mode="strategy"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: spacing.lg,
          }}
        >
          {regions.map((r, i) => (
            <div
              key={i}
              style={{
                background: colors.neutral.surface,
                border: `1px solid ${colors.neutral.border}`,
                borderRadius: "8px",
                padding: spacing.lg,
              }}
            >
              <h4 style={{ fontSize: "1.125rem", fontWeight: 700, margin: 0 }}>
                {r.name}
              </h4>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: colors.strategy.primary,
                  margin: `${spacing.md} 0`,
                }}
              >
                {r.adoption}
              </div>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: colors.neutral.muted,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {r.opportunity}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section
        title="Ready to validate your market hypothesis?"
        centered
        background={`linear-gradient(135deg, ${colors.strategy.primary}15 0%, ${colors.strategy.dark}05 100%)`}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: spacing.xl, color: colors.neutral.muted }}>
            Use the analysis frameworks above to structure your market entry, then move to the Hardware Desk to configure the infrastructure that brings your strategy to life.
          </p>
          <button
            onClick={() => navigate("/hardware")}
            style={{
              background: colors.strategy.primary,
              color: "white",
              border: "none",
              padding: `${spacing.md} ${spacing.xl}`,
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            Configure hardware infrastructure →
          </button>
        </div>
      </Section>
    </PageLayout>
  );
}
