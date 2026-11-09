const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        card: "var(--card)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        soft: "var(--soft)",
        line: "var(--line)",
        track: "var(--track)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "on-accent": "var(--on-accent)",
        warn: "var(--warn)",
        "warn-soft": "var(--warn-soft)",
        ink: "var(--ink)",
        "ink-fg": "var(--ink-fg)",
        "ink-link": "var(--ink-link)",
      },
      fontFamily: {
        sans: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
        heading: ["var(--font-heading)", "var(--font-body)", ...defaultTheme.fontFamily.sans],
      },
      /**
       * Type scale: Tailwind's defaults (xs 12, sm 14, base 16, lg 18, xl 20, 2xl 24, 3xl 30, 4xl 36, 5xl 48,
       * 6xl 60) plus one caption size for eyebrows, pills and captions. Use these, not arbitrary px values.
       */
      fontSize: {
        caption: ["0.8125rem", { lineHeight: "1.25rem" }],
      },
      /** Radius scale: tile (small cards, controls), card (cards), panel (hero and feature panels). */
      borderRadius: {
        tile: "12px",
        card: "20px",
        panel: "28px",
      },
      maxWidth: { prose: "68ch" },
    },
  },
  plugins: [],
};
