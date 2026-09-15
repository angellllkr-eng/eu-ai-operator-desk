/**
 * Section Template — Reusable section with title, description, and content
 */
import { ReactNode } from "react";
import { colors, spacing } from "@/lib/designSystem";

interface SectionProps {
  title: string;
  description?: string;
  centered?: boolean;
  mode?: "strategy" | "hardware";
  background?: string;
  children: ReactNode;
}

export default function Section({
  title,
  description,
  centered = false,
  mode = "strategy",
  background = colors.neutral.surface,
  children,
}: SectionProps) {
  const palette = mode === "strategy" ? colors.strategy : colors.hardware;

  return (
    <section
      style={{
        background,
        borderRadius: "8px",
        border: `1px solid ${colors.neutral.border}`,
        padding: spacing.xl,
        marginBottom: spacing.xl,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: centered ? "center" : "left" }}>
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: colors.neutral.text,
            marginBottom: spacing.sm,
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontSize: "0.95rem",
              color: colors.neutral.muted,
              maxWidth: centered ? "600px" : "100%",
              margin: centered ? `0 auto ${spacing.xl}` : `0 0 ${spacing.xl}`,
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Content */}
      <div>{children}</div>
    </section>
  );
}
