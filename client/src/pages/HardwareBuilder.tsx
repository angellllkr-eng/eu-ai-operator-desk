/**
 * Hardware Builder — Workstation Configurator
 * Modern Sept 2026 design: technical, clean, component-focused
 */
import { useLocation } from "wouter";
import { Zap, Cpu, HardDrive, Thermometer, Package, AlertCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Section from "@/components/Section";
import CardGrid, { Card } from "@/components/CardGrid";
import { AffiliateLink, SponsorSlot } from "@/components/Monetization";
import { colors, spacing } from "@/lib/designSystem";
import { affiliateComponentLinks } from "@shared/monetization";
import { useState } from "react";

export default function HardwareBuilder() {
  const [, navigate] = useLocation();
  const [selectedMode, setSelectedMode] = useState<"focused" | "parallel" | "enterprise">("focused");

  const operatingModes = [
    {
      id: "focused",
      name: "Focused Desk",
      description: "Single workstation for research, content creation, small team operations",
      budget: "$2,000 - $4,000",
      specs: {
        cpu: "AMD Ryzen 7 / Intel i7",
        gpu: "RTX 4070 / RTX 4080",
        memory: "32GB DDR5",
        storage: "1-2TB NVMe SSD",
      },
      useCase: "Solo operator, researcher, content team",
    },
    {
      id: "parallel",
      name: "Parallel Multi-Agent",
      description: "Coordinated multi-GPU setup for agent orchestration, distributed inference",
      budget: "$6,000 - $12,000",
      specs: {
        cpu: "AMD Threadripper / Intel Xeon",
        gpu: "2x RTX 4090 / 4x RTX 5880 Ada",
        memory: "128GB+ DDR5",
        storage: "4-6TB NVMe SSD + 20TB NAS",
      },
      useCase: "Multi-agent workflows, parallel inference, research teams",
    },
    {
      id: "enterprise",
      name: "Enterprise Private Lab",
      description: "Rack-scale infrastructure for large-scale training, high-throughput inference",
      budget: "$30,000+",
      specs: {
        cpu: "Dual Xeon Platinum / EPYC",
        gpu: "8x RTX 6000 Ada / H100 cluster",
        memory: "512GB+ DDR5 / HBM3",
        storage: "50TB+ distributed storage, 100Mbps+ network",
      },
      useCase: "Enterprise operations, training, multi-tenant AI services",
    },
  ];

  const components = [
    {
      category: "CPU",
      icon: "🔧",
      description: "Processor determines workload handling, multi-threaded performance",
      options: [
        { name: "AMD Ryzen 7 7800X3D", tier: "Focused", perf: "8-core, great single-thread", amazon: "https://amazon.com/s?k=AMD+Ryzen+7+7800X3D" },
        { name: "Intel Core i9-14900K", tier: "Focused", perf: "24-core, strong all-around", amazon: "https://amazon.com/s?k=Intel+i9-14900K" },
        { name: "AMD Threadripper Pro 5995WX", tier: "Parallel", perf: "64-core, workstation beast", amazon: "https://amazon.com/s?k=AMD+Threadripper+5995WX" },
        { name: "Intel Xeon W7-2495X", tier: "Enterprise", perf: "60-core, ECC memory", amazon: "https://amazon.com/s?k=Intel+Xeon+W7" },
      ],
    },
    {
      category: "GPU",
      icon: "⚡",
      description: "GPU is the critical resource: VRAM, memory bandwidth, thermal design",
      options: [
        { name: "RTX 4070 Super (12GB)", tier: "Focused", perf: "Entry AI workloads", amazon: "https://amazon.com/s?k=RTX+4070+Super" },
        { name: "RTX 4090 (24GB)", tier: "Parallel", perf: "High-performance inference + training", amazon: "https://amazon.com/s?k=RTX+4090" },
        { name: "RTX 5880 Ada (48GB)", tier: "Parallel", perf: "Double-precision, research", amazon: "https://amazon.com/s?k=RTX+5880" },
        { name: "H100 (80GB HBM3)", tier: "Enterprise", perf: "Large-scale training", amazon: "https://amazon.com/s?k=H100+GPU" },
      ],
    },
    {
      category: "Memory",
      icon: "💾",
      description: "DDR5 for speed, ECC for reliability. Minimum: 32GB (focused), 128GB (parallel), 256GB (enterprise)",
      options: [
        { name: "32GB DDR5-6000", tier: "Focused", perf: "Sweet spot for multi-agent" },
        { name: "128GB DDR5-6000 ECC", tier: "Parallel", perf: "Fault tolerance" },
        { name: "512GB DDR5 ECC", tier: "Enterprise", perf: "Multi-tenant workloads" },
      ],
    },
    {
      category: "Storage",
      icon: "🗄️",
      description: "NVMe for speed, HDD for capacity. RAID for reliability on multi-GPU setups",
      options: [
        { name: "2TB Samsung 990 Pro", tier: "Focused", perf: "OS + models + cache" },
        { name: "4TB NVMe + 20TB NAS", tier: "Parallel", perf: "Hot storage + archive" },
        { name: "50TB+ distributed (Ceph/GlusterFS)", tier: "Enterprise", perf: "Fault-tolerant scale" },
      ],
    },
    {
      category: "Cooling",
      icon: "❄️",
      description: "Air or liquid cooling. Multi-GPU setups need serious airflow or custom liquid loops",
      options: [
        { name: "Noctua NH-D15 (Air)", tier: "Focused", perf: "Silent, effective" },
        { name: "Corsair H170i Elite (AIO)", tier: "Parallel", perf: "Compact, reliable" },
        { name: "Custom liquid loop or data center cooling", tier: "Enterprise", perf: "Redundancy-ready" },
      ],
    },
  ];

  const currentMode = operatingModes.find((m) => m.id === selectedMode)!;

  return (
    <PageLayout
      mode="hardware"
      title="Private Compute Configurator"
      subtitle="Build a coherent local-AI workstation: focused desk, parallel multi-agent, or enterprise lab"
      actions={
        <button
          onClick={() => navigate("/strategy")}
          style={{
            background: colors.hardware.primary,
            color: "white",
            border: "none",
            padding: `${spacing.sm} ${spacing.md}`,
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← Back to Strategy
        </button>
      }
    >
      {/* Operating Modes */}
      <Section
        title="Choose Your Operating Mode"
        description="Select your primary use case: solo operator, multi-agent team, or enterprise infrastructure"
        mode="hardware"
      >
        <CardGrid columns={3}>
          {operatingModes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => setSelectedMode(mode.id as "focused" | "parallel" | "enterprise")}
              style={{
                background: colors.neutral.surface,
                border: `2px solid ${selectedMode === mode.id ? colors.hardware.primary : colors.neutral.border}`,
                borderRadius: "8px",
                padding: spacing.lg,
                cursor: "pointer",
                transition: `all 200ms ease-out`,
                boxShadow:
                  selectedMode === mode.id
                    ? `0 0 0 3px ${colors.hardware.primary}20`
                    : "none",
              }}
              onMouseEnter={(e) => {
                if (selectedMode !== mode.id) {
                  (e.currentTarget as HTMLElement).style.borderColor = colors.hardware.primary;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedMode !== mode.id) {
                  (e.currentTarget as HTMLElement).style.borderColor = colors.neutral.border;
                }
              }}
            >
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, margin: 0 }}>
                {mode.name}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: colors.neutral.muted,
                  margin: `${spacing.sm} 0 ${spacing.md}`,
                  lineHeight: 1.5,
                }}
              >
                {mode.description}
              </p>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: colors.hardware.primary,
                  marginBottom: spacing.sm,
                }}
              >
                {mode.budget}
              </div>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: colors.neutral.subtle,
                  margin: 0,
                }}
              >
                Typical use: {mode.useCase}
              </p>
            </div>
          ))}
        </CardGrid>
      </Section>

      {/* Selected Mode Specs */}
      <Section
        title={`${currentMode.name}: Recommended Specs`}
        description="These are the components that matter for your workload"
        mode="hardware"
        background={`linear-gradient(135deg, ${colors.hardware.primary}08 0%, ${colors.hardware.secondary}08 100%)`}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: spacing.lg,
          }}
        >
          {Object.entries(currentMode.specs).map(([key, value]) => (
            <div
              key={key}
              style={{
                background: colors.neutral.surface,
                border: `1px solid ${colors.neutral.border}`,
                borderRadius: "6px",
                padding: spacing.lg,
              }}
            >
              <strong style={{ textTransform: "uppercase", fontSize: "0.75rem", color: colors.neutral.subtle }}>
                {key}
              </strong>
              <p style={{ fontSize: "1rem", fontWeight: 600, margin: `${spacing.sm} 0 0` }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Component Breakdown */}
      <Section
        title="Component Strategy"
        description="Trade-offs and reasoning for each critical component"
        mode="hardware"
      >
        <div
          style={{
            display: "grid",
            gap: spacing.xl,
          }}
        >
          {components.map((comp, i) => (
            <div
              key={i}
              style={{
                background: colors.neutral.surface,
                border: `1px solid ${colors.neutral.border}`,
                borderRadius: "8px",
                padding: spacing.lg,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }}>
                <div style={{ fontSize: "1.5rem" }}>{comp.icon}</div>
                <div>
                  <h4 style={{ fontSize: "1.125rem", fontWeight: 700, margin: 0 }}>
                    {comp.category}
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: colors.neutral.muted, margin: `${spacing.sm} 0 0` }}>
                    {comp.description}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: spacing.md,
                }}
              >
                {comp.options.map((opt, j) => (
                  <div
                    key={j}
                    style={{
                      background: colors.neutral.bg,
                      borderRadius: "6px",
                      padding: spacing.md,
                      fontSize: "0.85rem",
                    }}
                  >
                    <strong>{opt.name}</strong>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: colors.hardware.primary,
                        margin: `${spacing.sm} 0`,
                      }}
                    >
                      {opt.tier}
                    </p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: colors.neutral.muted,
                        margin: 0,
                      }}
                    >
                      {opt.perf}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Sponsor Slot - Featured Partner */}
      <Section
        title="Featured Partner"
        description="Trusted hardware and software partners for EU AI deployment"
        mode="hardware"
      >
        <SponsorSlot position="featured" />
      </Section>

      {/* CTA */}
      <Section
        title="Ready to build?"
        centered
        background={`linear-gradient(135deg, ${colors.hardware.primary}15 0%, ${colors.hardware.secondary}08 100%)`}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: spacing.xl, color: colors.neutral.muted }}>
            Export your configuration, source components, and start building. Remember: validate your market strategy first, then right-size the hardware.
          </p>
          <div style={{ display: "flex", gap: spacing.lg, justifyContent: "center" }}>
            <button
              style={{
                background: colors.hardware.primary,
                color: "white",
                border: "none",
                padding: `${spacing.md} ${spacing.xl}`,
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Export configuration
            </button>
            <button
              onClick={() => navigate("/strategy")}
              style={{
                background: "transparent",
                color: colors.hardware.primary,
                border: `2px solid ${colors.hardware.primary}`,
                padding: `${spacing.md} ${spacing.xl}`,
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Back to strategy
            </button>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
