/**
 * EU AI Operator's Desk — Design System
 * Modern Sept 2026 aesthetic: clean, minimal, evidence-driven
 */

export const colors = {
  // Strategy (warm, editorial)
  strategy: {
    primary: "#E06B3C", // Saffron
    dark: "#10212b", // Deep ink
    light: "#faf9f7", // Warm paper
    accent: "#d15a2c",
  },

  // Hardware (cool, technical)
  hardware: {
    primary: "#2B55FF", // Signal Cobalt
    secondary: "#4E8078", // Sage green
    light: "#f8f9fc", // Porcelain
    accent: "#1a35d9",
  },

  // Neutral
  neutral: {
    bg: "#faf9f7",
    surface: "#ffffff",
    border: "#e5ddd2",
    text: "#10212b",
    muted: "#666666",
    subtle: "#999999",
  },

  // Feedback
  feedback: {
    success: "#2d9d78",
    warning: "#d97706",
    error: "#dc2626",
    info: "#2B55FF",
  },
};

export const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", monospace',
  },

  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
};

export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  lg: "0 8px 24px rgba(0, 0, 0, 0.08)",
  xl: "0 12px 32px rgba(0, 0, 0, 0.12)",
};

export const transitions = {
  fast: "150ms ease-out",
  normal: "200ms ease-out",
  slow: "300ms ease-out",
};

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
