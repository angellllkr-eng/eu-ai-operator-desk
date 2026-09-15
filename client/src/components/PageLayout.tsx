/**
 * Page Layout Template — Reusable structure for Strategy & Hardware pages
 * Modern, clean, responsive with smooth animations
 */
import { ReactNode } from "react";
import { colors, spacing } from "@/lib/designSystem";

interface PageLayoutProps {
  mode: "strategy" | "hardware";
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function PageLayout({
  mode,
  title,
  subtitle,
  children,
  actions,
}: PageLayoutProps) {
  const palette = mode === "strategy" ? colors.strategy : colors.hardware;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.neutral.bg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: colors.neutral.surface,
          borderBottom: `1px solid ${colors.neutral.border}`,
          padding: `${spacing.lg} ${spacing.xl}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: 700,
              color: palette.primary,
              margin: 0,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: "0.875rem",
                color: colors.neutral.muted,
                margin: `${spacing.sm} 0 0`,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </header>

      {/* Main content */}
      <main
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: spacing.xl,
          flex: 1,
        }}
      >
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          header {
            flex-direction: column;
            align-items: flex-start;
            gap: ${spacing.md};
          }
          h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
