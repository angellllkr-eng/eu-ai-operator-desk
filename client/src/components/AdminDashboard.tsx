/**
 * Admin Dashboard - Monetization Control Center
 * Manage sponsors, affiliates, analytics, payouts
 */
import { useState, useEffect } from "react";
import { colors, spacing } from "@/lib/designSystem";

interface DashboardStats {
  totalSponsors: number;
  activeSponsors: number;
  totalAffiliates: number;
  totalRevenue: number;
  pendingApplications: number;
  revenueThisMonth: number;
}

interface Sponsor {
  id: string;
  name: string;
  tier: string;
  status: string;
  created_at: string;
  monthly_price: number;
  total_clicks: number;
}

interface Affiliate {
  id: string;
  name: string;
  email: string;
  total_commission: number;
  total_conversions: number;
  status: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "sponsors" | "affiliates">(
    "overview"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, sponsorsRes, affiliatesRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/sponsors"),
        fetch("/api/admin/affiliates"),
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (sponsorsRes.ok) setSponsors(await sponsorsRes.json());
      if (affiliatesRes.ok) setAffiliates(await affiliatesRes.json());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        Loading dashboard...
      </div>
    );
  }

  return (
    <div style={{ background: colors.neutral.bg, minHeight: "100vh", padding: spacing.xl }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: spacing.xl * 2 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>
            Monetization Dashboard
          </h1>
          <p style={{ color: colors.neutral.muted, margin: `${spacing.md} 0 0` }}>
            Manage sponsors, affiliates, and track revenue
          </p>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: "flex",
            gap: spacing.lg,
            borderBottom: `1px solid ${colors.neutral.border}`,
            marginBottom: spacing.xl,
          }}
        >
          {(["overview", "sponsors", "affiliates"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                padding: `${spacing.md} ${spacing.lg}`,
                borderBottom:
                  activeTab === tab
                    ? `3px solid ${colors.hardware.primary}`
                    : "3px solid transparent",
                cursor: "pointer",
                fontWeight: activeTab === tab ? 700 : 600,
                color: activeTab === tab ? colors.hardware.primary : colors.neutral.muted,
                fontSize: "1rem",
                transition: `all 200ms ease-out`,
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && stats && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: spacing.lg }}>
            {[
              { label: "Total Sponsors", value: stats.totalSponsors, icon: "🤝" },
              { label: "Active Sponsors", value: stats.activeSponsors, icon: "✓" },
              { label: "Total Affiliates", value: stats.totalAffiliates, icon: "🔗" },
              {
                label: "Revenue This Month",
                value: `$${stats.revenueThisMonth}`,
                icon: "💰",
              },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  background: colors.neutral.surface,
                  border: `1px solid ${colors.neutral.border}`,
                  borderRadius: "8px",
                  padding: spacing.xl,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: spacing.md }}>
                  {stat.icon}
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 700, marginBottom: spacing.sm }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.9rem", color: colors.neutral.muted }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sponsors Tab */}
        {activeTab === "sponsors" && (
          <div style={{ background: colors.neutral.surface, borderRadius: "8px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: `1px solid ${colors.neutral.border}`,
                    background: colors.neutral.bg,
                  }}
                >
                  {["Name", "Tier", "Status", "Clicks", "Revenue/Mo", "Actions"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: spacing.lg,
                        textAlign: "left",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sponsors.map((sponsor) => (
                  <tr key={sponsor.id} style={{ borderBottom: `1px solid ${colors.neutral.border}` }}>
                    <td style={{ padding: spacing.lg }}>{sponsor.name}</td>
                    <td style={{ padding: spacing.lg }}>
                      <span
                        style={{
                          background:
                            sponsor.tier === "gold"
                              ? "#fbbf24"
                              : sponsor.tier === "silver"
                                ? "#d1d5db"
                                : "#f59e0b",
                          color: "black",
                          padding: `${spacing.xs} ${spacing.sm}`,
                          borderRadius: "4px",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        {sponsor.tier}
                      </span>
                    </td>
                    <td style={{ padding: spacing.lg }}>
                      <span
                        style={{
                          color:
                            sponsor.status === "active"
                              ? "#059669"
                              : sponsor.status === "pending"
                                ? "#d97706"
                                : "#6b7280",
                        }}
                      >
                        {sponsor.status}
                      </span>
                    </td>
                    <td style={{ padding: spacing.lg }}>{sponsor.total_clicks}</td>
                    <td style={{ padding: spacing.lg, fontWeight: 700 }}>
                      ${sponsor.monthly_price}
                    </td>
                    <td style={{ padding: spacing.lg }}>
                      <button
                        style={{
                          background: colors.hardware.primary,
                          color: "white",
                          border: "none",
                          padding: `${spacing.xs} ${spacing.md}`,
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Affiliates Tab */}
        {activeTab === "affiliates" && (
          <div style={{ background: colors.neutral.surface, borderRadius: "8px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: `1px solid ${colors.neutral.border}`,
                    background: colors.neutral.bg,
                  }}
                >
                  {["Name", "Email", "Conversions", "Commission", "Status", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: spacing.lg,
                          textAlign: "left",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {affiliates.map((aff) => (
                  <tr key={aff.id} style={{ borderBottom: `1px solid ${colors.neutral.border}` }}>
                    <td style={{ padding: spacing.lg }}>{aff.name}</td>
                    <td style={{ padding: spacing.lg }}>{aff.email}</td>
                    <td style={{ padding: spacing.lg }}>{aff.total_conversions}</td>
                    <td style={{ padding: spacing.lg, fontWeight: 700 }}>
                      ${aff.total_commission.toFixed(2)}
                    </td>
                    <td style={{ padding: spacing.lg }}>
                      <span
                        style={{
                          color: aff.status === "active" ? "#059669" : "#6b7280",
                          fontWeight: 600,
                        }}
                      >
                        {aff.status}
                      </span>
                    </td>
                    <td style={{ padding: spacing.lg }}>
                      <button
                        style={{
                          background: colors.hardware.primary,
                          color: "white",
                          border: "none",
                          padding: `${spacing.xs} ${spacing.md}`,
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
