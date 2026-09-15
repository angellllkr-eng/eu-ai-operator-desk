/**
 * Card Grid Template — Reusable grid for sections, features, market items
 * Modern layout with smooth hover effects
 */
import { ReactNode } from "react";
import { colors, spacing, shadows, transitions } from "@/lib/designSystem";

interface CardGridProps {
  columns?: number;
  gap?: string;
  children: ReactNode;
}

export default function CardGrid({
  columns = 3,
  gap = spacing.xl,
  children,
}: CardGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children}

      <style>{`
        @media (max-width: 1024px) {
          div {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          div {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

interface CardProps {
  mode?: "strategy" | "hardware";
  title: string;
  description?: string;
  features?: string[];
  icon?: ReactNode;
  cta?: {
    label: string;
    onClick: () => void;
  };
  highlighted?: boolean;
}

export function Card({
  mode = "strategy",
  title,
  description,
  features,
  icon,
  cta,
  highlighted,
}: CardProps) {
  const palette = mode === "strategy" ? colors.strategy : colors.hardware;

  return (
    <div
      style={{
        background: colors.neutral.surface,
        border: `1px solid ${highlighted ? palette.primary : colors.neutral.border}`,
        borderRadius: "8px",
        padding: spacing.xl,
        transition: `all ${transitions.normal}`,
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = palette.primary;
        (e.currentTarget as HTMLElement).style.boxShadow = shadows.lg;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = highlighted
          ? palette.primary
          : colors.neutral.border;
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Icon */}
      {icon && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "6px",
            background: `${palette.primary}15`,
            color: palette.primary,
            marginBottom: spacing.md,
            fontSize: "1.5rem",
          }}
        >
          {icon}
        </div>
      )}

      {/* Title */}
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: colors.neutral.text,
          margin: `0 0 ${spacing.sm}`,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: "0.9rem",
            lineHeight: 1.6,
            color: colors.neutral.muted,
            margin: `0 0 ${spacing.md}`,
          }}
        >
          {description}
        </p>
      )}

      {/* Features */}
      {features && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: `0 0 ${spacing.md}`,
            fontSize: "0.85rem",
            color: colors.neutral.muted,
          }}
        >
          {features.map((feature, i) => (
            <li key={i} style={{ marginBottom: spacing.sm }}>
              ✓ {feature}
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      {cta && (
        <button
          onClick={cta.onClick}
          style={{
            background: colors.neutral.text,
            color: colors.neutral.surface,
            border: "none",
            padding: `${spacing.sm} ${spacing.md}`,
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.9rem",
            transition: `all ${transitions.normal}`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "none";
          }}
        >
          {cta.label} →
        </button>
      )}
    </div>
  );
}
