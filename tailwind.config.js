/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050816",
        navy: "#081327",
        cyan: "#22d3ee",
        electric: "#3b82f6",
        violet: "#8b5cf6"
      },
      fontFamily: {
        sans: [
          "SF Pro Text",
          "SF Pro Display",
          "SF Pro Rounded",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
        display: [
          "SF Pro Display",
          "SF Pro Text",
          "SF Pro Rounded",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34,211,238,0.3), 0 18px 45px rgba(6, 26, 55, 0.55)",
        card: "0 14px 34px rgba(0, 0, 0, 0.45)"
      },
      backgroundImage: {
        "hero-grid": "linear-gradient(rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.09) 1px, transparent 1px)",
        "premium-gradient": "linear-gradient(120deg,#38bdf8 0%,#60a5fa 45%,#f59e0b 100%)"
      }
    }
  },
  plugins: []
};
