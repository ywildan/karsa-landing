import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--paper)", foreground: "var(--ink)",
        primary: "var(--accent)", border: "var(--rule)",
        muted: "var(--muted)",
      },
      fontFamily: {
        display: ["var(--font-instrument)", "Georgia", "serif"],
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: { sm: "4px", md: "8px", lg: "12px" },
      transitionTimingFunction: { karsa: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  },
  plugins: [],
} satisfies Config;
