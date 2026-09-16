export const SUPPORTED_LANGUAGES = ["en", "bg", "de", "fr", "es", "it", "nl", "pl", "ro", "el"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function normalizeLanguage(value: string | null | undefined): SupportedLanguage | null {
  if (!value) return null;
  const base = value.trim().toLowerCase().split("-")[0];
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(base) ? base as SupportedLanguage : null;
}

export function resolveBrowserLanguage(explicit?: string | null): SupportedLanguage {
  return normalizeLanguage(explicit) ||
    normalizeLanguage(typeof navigator !== "undefined" ? navigator.language : null) ||
    DEFAULT_LANGUAGE;
}

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";
