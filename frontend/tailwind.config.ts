import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          base: "#080B10",
          subtle: "#0C1117",
          panel: "#111821",
          elevated: "#151D26",
          card: "#18222E",
          hover: "#1D2837",
        },
        border: {
          subtle: "#1C2633",
          muted: "#253346",
          active: "#38BDF8",
          strong: "#334155",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#64748B",
          faint: "#475569",
        },
        accent: {
          primary: "#38BDF8",
          hover: "#0EA5E9",
          muted: "#164E63",
          subtle: "rgba(56, 189, 248, 0.08)",
          indigo: "#6366F1",
        },
        semantic: {
          healthy: "#10B981",
          moderate: "#F59E0B",
          elevated: "#F97316",
          critical: "#EF4444",
        },
        category: {
          synthetic: "#38BDF8",
          manipulation: "#A855F7",
          anomaly: "#F59E0B",
          integrity: "#F43F5E",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        "display-sm": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "display-md": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "display-lg": ["1.875rem", { lineHeight: "1.25", fontWeight: "600" }],
        "section-title": ["0.9375rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-default": ["0.8125rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-secondary": ["0.75rem", { lineHeight: "1.5", fontWeight: "400" }],
        "caption": ["0.6875rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};
export default config;
