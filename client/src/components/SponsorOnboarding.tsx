/**
 * Sponsor Onboarding Form
 * Application form for companies to request sponsorship
 */
import { useState } from "react";
import { colors, spacing } from "@/lib/designSystem";

const sponsorTiers = [
  {
    id: "bronze",
    name: "Bronze",
    price: 500,
    desc: "Logo + link in sidebar & footer",
  },
  {
    id: "silver",
    name: "Silver",
    price: 1000,
    desc: "Featured section + description",
  },
  {
    id: "gold",
    name: "Gold",
    price: 2000,
    desc: "Homepage featured + custom integration",
  },
];

export default function SponsorOnboarding() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    website: "",
    tier: "silver",
    description: "",
    logoUrl: "",
    ctaText: "Learn More",
    ctaUrl: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/sponsors/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          companyName: "",
          email: "",
          website: "",
          tier: "silver",
          description: "",
          logoUrl: "",
          ctaText: "Learn More",
          ctaUrl: "",
        });

        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Failed to submit sponsor application:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: spacing.xl }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: spacing.lg }}>
        Become a Sponsor
      </h1>
      <p style={{ color: colors.neutral.muted, marginBottom: spacing.xl }}>
        Reach 50k+ European AI decision-makers. Get in front of your target market.
      </p>

      {success && (
        <div
          style={{
            background: "#d1fae5",
            border: "1px solid #6ee7b7",
            borderRadius: "6px",
            padding: spacing.lg,
            marginBottom: spacing.xl,
            color: "#065f46",
          }}
        >
          ✓ Application received! We'll review and contact you within 24 hours.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: spacing.lg }}>
        {/* Company Name */}
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: spacing.sm }}>
            Company Name *
          </label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            style={{
              width: "100%",
              padding: spacing.md,
              border: `1px solid ${colors.neutral.border}`,
              borderRadius: "6px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
            placeholder="Nvidia, Lambda Labs, n8n, etc."
          />
        </div>

        {/* Email */}
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: spacing.sm }}>
            Contact Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              width: "100%",
              padding: spacing.md,
              border: `1px solid ${colors.neutral.border}`,
              borderRadius: "6px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
            placeholder="sponsor@company.com"
          />
        </div>

        {/* Website */}
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: spacing.sm }}>
            Website
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            style={{
              width: "100%",
              padding: spacing.md,
              border: `1px solid ${colors.neutral.border}`,
              borderRadius: "6px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
            placeholder="https://company.com"
          />
        </div>

        {/* Tier Selection */}
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: spacing.sm }}>
            Sponsorship Tier *
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: spacing.md }}>
            {sponsorTiers.map((tier) => (
              <div
                key={tier.id}
                onClick={() => setFormData({ ...formData, tier: tier.id })}
                style={{
                  padding: spacing.md,
                  border: `2px solid ${
                    formData.tier === tier.id
                      ? colors.hardware.primary
                      : colors.neutral.border
                  }`,
                  borderRadius: "6px",
                  cursor: "pointer",
                  textAlign: "center",
                  background:
                    formData.tier === tier.id
                      ? `${colors.hardware.primary}10`
                      : "transparent",
                  transition: `all 200ms ease-out`,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "1.125rem" }}>{tier.name}</div>
                <div style={{ color: colors.hardware.primary, fontWeight: 600, margin: `${spacing.sm} 0` }}>
                  ${tier.price}/mo
                </div>
                <div style={{ fontSize: "0.75rem", color: colors.neutral.muted }}>
                  {tier.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logo URL */}
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: spacing.sm }}>
            Logo URL
          </label>
          <input
            type="url"
            value={formData.logoUrl}
            onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
            style={{
              width: "100%",
              padding: spacing.md,
              border: `1px solid ${colors.neutral.border}`,
              borderRadius: "6px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
            placeholder="https://company.com/logo.png"
          />
          <p style={{ fontSize: "0.85rem", color: colors.neutral.muted, margin: `${spacing.sm} 0 0` }}>
            PNG or SVG, 200x100px recommended
          </p>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: spacing.sm }}>
            Description (2-3 sentences)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            style={{
              width: "100%",
              padding: spacing.md,
              border: `1px solid ${colors.neutral.border}`,
              borderRadius: "6px",
              fontSize: "1rem",
              boxSizing: "border-box",
              minHeight: "80px",
              fontFamily: "inherit",
            }}
            placeholder="What makes your company relevant to EU AI operators?"
          />
        </div>

        {/* CTA */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.md }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: spacing.sm }}>
              CTA Text
            </label>
            <input
              type="text"
              value={formData.ctaText}
              onChange={(e) =>
                setFormData({ ...formData, ctaText: e.target.value })
              }
              style={{
                width: "100%",
                padding: spacing.md,
                border: `1px solid ${colors.neutral.border}`,
                borderRadius: "6px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
              placeholder="Learn More"
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: spacing.sm }}>
              CTA URL
            </label>
            <input
              type="url"
              value={formData.ctaUrl}
              onChange={(e) =>
                setFormData({ ...formData, ctaUrl: e.target.value })
              }
              style={{
                width: "100%",
                padding: spacing.md,
                border: `1px solid ${colors.neutral.border}`,
                borderRadius: "6px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
              placeholder="https://company.com/offer"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            background: colors.hardware.primary,
            color: "white",
            border: "none",
            padding: `${spacing.md} ${spacing.xl}`,
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1,
            transition: `all 200ms ease-out`,
          }}
          onMouseEnter={(e) => {
            if (!submitting) {
              (e.currentTarget as HTMLElement).transform = "translateY(-2px)";
            }
          }}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>

        <p style={{ fontSize: "0.85rem", color: colors.neutral.muted, textAlign: "center" }}>
          We'll review your application and contact you within 24 hours.
        </p>
      </form>
    </div>
  );
}
