/**
 * Affiliate Link Wrapper Component
 * Tracks clicks, builds affiliate URLs, logs for analytics
 */
import { useEffect } from "react";
import { colors, spacing } from "@/lib/designSystem";

interface AffiliateProps {
  productName: string;
  productId: string;
  amazon?: string;
  newegg?: string;
  bhphoto?: string;
  retailer?: "amazon" | "newegg" | "bhphoto"; // default retailer
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tier?: "focused" | "parallel" | "enterprise";
}

export function AffiliateLink({
  productName,
  productId,
  amazon,
  newegg,
  bhphoto,
  retailer = "amazon",
  children,
  className,
  style,
  tier,
}: AffiliateProps) {
  const getAffiliateUrl = () => {
    const utmParams = `?utm_source=eu-ai-operator&utm_medium=affiliate&utm_campaign=${productId}&utm_content=${tier || "general"}`;

    switch (retailer) {
      case "newegg":
        return newegg ? `${newegg}${utmParams}` : amazon;
      case "bhphoto":
        return bhphoto ? `${bhphoto}${utmParams}` : amazon;
      default:
        return amazon ? `${amazon}${utmParams}` : "#";
    }
  };

  const trackClick = () => {
    // Log to analytics backend
    fetch("/api/analytics/affiliate-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName,
        productId,
        retailer,
        tier,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {}); // Silent fail
  };

  return (
    <a
      href={getAffiliateUrl()}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={trackClick}
      className={className}
      style={{
        ...style,
        color: colors.hardware.primary,
        textDecoration: "none",
        borderBottom: `1px dotted ${colors.hardware.primary}`,
        cursor: "pointer",
        transition: `all 200ms ease-out`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderBottomStyle = "solid";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderBottomStyle = "dotted";
      }}
    >
      {children}
      <span style={{ fontSize: "0.75rem", marginLeft: "0.25rem" }}>↗</span>
    </a>
  );
}

interface SponsorSlotProps {
  position: "sidebar" | "footer" | "featured" | "homepage";
  sponsors?: SponsorData[];
}

interface SponsorData {
  id: string;
  name: string;
  logo: string;
  url: string;
  description?: string;
  cta?: string;
}

export function SponsorSlot({ position, sponsors = [] }: SponsorSlotProps) {
  if (!sponsors || sponsors.length === 0) {
    return (
      <div
        style={{
          background: `${colors.neutral.bg}`,
          border: `2px dashed ${colors.neutral.border}`,
          borderRadius: "8px",
          padding: spacing.lg,
          textAlign: "center",
          color: colors.neutral.muted,
          fontSize: "0.85rem",
        }}
      >
        <p style={{ margin: 0 }}>
          🤝 Sponsor this position
          <br />
          <a
            href="mailto:sponsors@eu-ai-desk.com"
            style={{
              color: colors.hardware.primary,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Contact us
          </a>
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gap: spacing.md,
      }}
    >
      {sponsors.map((sponsor) => (
        <a
          key={sponsor.id}
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            fetch("/api/analytics/sponsor-click", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                sponsorId: sponsor.id,
                position,
                timestamp: new Date().toISOString(),
              }),
            }).catch(() => {})
          }
          style={{
            background: colors.neutral.surface,
            border: `1px solid ${colors.neutral.border}`,
            borderRadius: "8px",
            padding: spacing.md,
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.sm,
            transition: `all 200ms ease-out`,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              colors.hardware.primary;
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 2px ${colors.hardware.primary}20`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              colors.neutral.border;
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          {/* Logo */}
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            style={{
              maxWidth: "100%",
              height: "40px",
              objectFit: "contain",
            }}
          />

          {/* Description */}
          {sponsor.description && (
            <p
              style={{
                fontSize: "0.8rem",
                color: colors.neutral.muted,
                margin: 0,
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              {sponsor.description}
            </p>
          )}

          {/* CTA */}
          {sponsor.cta && (
            <span
              style={{
                fontSize: "0.8rem",
                color: colors.hardware.primary,
                fontWeight: 600,
                marginTop: spacing.xs,
              }}
            >
              {sponsor.cta} →
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
