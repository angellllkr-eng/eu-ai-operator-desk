/**
 * Affiliate Signup Page
 * One-click redirects to affiliate programs + application form
 */
import { useLocation } from "wouter";
import { colors, spacing } from "@/lib/designSystem";

const affiliatePrograms = [
  {
    name: "Amazon Associates",
    commission: "3-5%",
    description: "Join one of the largest affiliate networks",
    url: "https://associate-amazon.com",
    icon: "🛍️",
  },
  {
    name: "Newegg Affiliate",
    commission: "4%",
    description: "Hardware and tech retailer affiliate program",
    url: "https://www.newegg.com/affiliate",
    icon: "⚡",
  },
  {
    name: "B&H Photo",
    commission: "3%",
    description: "Professional photography and video equipment",
    url: "https://www.bhphotovideo.com/affiliate",
    icon: "📸",
  },
];

export default function AffiliateSignup() {
  const [, navigate] = useLocation();

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: spacing.xl }}>
      <div style={{ textAlign: "center", marginBottom: spacing.xl * 2 }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: spacing.lg }}>
          Earn with EU AI Operator's Desk
        </h1>
        <p style={{ fontSize: "1.125rem", color: colors.neutral.muted, maxWidth: "600px", margin: "0 auto" }}>
          Recommend hardware. Get 3-5% commission on every sale.
        </p>
      </div>

      {/* Affiliate Programs Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: spacing.xl, marginBottom: spacing.xl * 2 }}>
        {affiliatePrograms.map((program, i) => (
          <a
            key={i}
            href={program.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() =>
              fetch("/api/analytics/affiliate-signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ program: program.name }),
              }).catch(() => {})
            }
            style={{
              background: colors.neutral.surface,
              border: `1px solid ${colors.neutral.border}`,
              borderRadius: "8px",
              padding: spacing.xl,
              textDecoration: "none",
              color: "inherit",
              transition: `all 200ms ease-out`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: spacing.lg,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = colors.hardware.primary;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 2px ${colors.hardware.primary}20`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = colors.neutral.border;
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "3rem" }}>{program.icon}</div>
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
                {program.name}
              </h3>
              <p style={{ fontSize: "0.9rem", color: colors.neutral.muted, margin: `${spacing.sm} 0 0` }}>
                {program.description}
              </p>
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: colors.hardware.primary,
              }}
            >
              {program.commission}
            </div>
            <button
              style={{
                background: colors.hardware.primary,
                color: "white",
                border: "none",
                padding: `${spacing.sm} ${spacing.lg}`,
                borderRadius: "6px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Sign Up →
            </button>
          </a>
        ))}
      </div>

      {/* How It Works */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.hardware.primary}08 0%, ${colors.hardware.secondary}08 100%)`,
          border: `1px solid ${colors.neutral.border}`,
          borderRadius: "8px",
          padding: spacing.xl * 1.5,
          marginBottom: spacing.xl * 2,
        }}
      >
        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: spacing.lg }}>
          How It Works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: spacing.lg,
          }}
        >
          {[
            { num: "1", title: "Sign Up", desc: "Join any affiliate program" },
            { num: "2", title: "Get ID", desc: "Copy your tracking ID" },
            { num: "3", title: "Earn", desc: "Every link click tracked" },
            { num: "4", title: "Get Paid", desc: "Monthly payouts (min $50)" },
          ].map((step, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: colors.hardware.primary,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  margin: `0 auto ${spacing.md}`,
                }}
              >
                {step.num}
              </div>
              <h4 style={{ fontWeight: 700, margin: 0, marginBottom: spacing.sm }}>
                {step.title}
              </h4>
              <p style={{ fontSize: "0.9rem", color: colors.neutral.muted, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form */}
      <div
        style={{
          background: colors.neutral.surface,
          border: `1px solid ${colors.neutral.border}`,
          borderRadius: "8px",
          padding: spacing.xl * 1.5,
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: spacing.lg }}>
          Join Our Partner Program
        </h2>
        <p style={{ color: colors.neutral.muted, marginBottom: spacing.xl }}>
          Want higher commission rates or custom terms? Apply for our premium affiliate program.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetch("/api/affiliates/apply", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement)
                  .value,
                email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement)
                  .value,
                website: (e.currentTarget.elements.namedItem("website") as HTMLInputElement)
                  .value,
              }),
            })
              .then(() => alert("Application submitted!"))
              .catch(() => alert("Failed to submit"));
          }}
          style={{ display: "grid", gap: spacing.lg, maxWidth: "500px" }}
        >
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            style={{
              padding: spacing.md,
              border: `1px solid ${colors.neutral.border}`,
              borderRadius: "6px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            style={{
              padding: spacing.md,
              border: `1px solid ${colors.neutral.border}`,
              borderRadius: "6px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
          <input
            name="website"
            type="url"
            placeholder="Your Website (optional)"
            style={{
              padding: spacing.md,
              border: `1px solid ${colors.neutral.border}`,
              borderRadius: "6px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            style={{
              background: colors.hardware.primary,
              color: "white",
              border: "none",
              padding: `${spacing.md} ${spacing.xl}`,
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Apply Now
          </button>
        </form>
      </div>
    </div>
  );
}
