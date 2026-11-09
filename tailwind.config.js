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
      maxWidth: { prose: "68ch" },
    },
  },
  plugins: [],
};
