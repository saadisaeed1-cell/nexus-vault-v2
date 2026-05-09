/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
        dark: {
          900: "#08080e",
          800: "#0d0d18",
          700: "#111120",
          600: "#161628",
          500: "#1a2234",
          400: "#263146",
        },
        neon: {
          DEFAULT: "#39FF14",
          dim: "#22c55e",
          glow: "rgba(57, 255, 20, 0.35)",
        },
        gold: {
          DEFAULT: "#f5c518",
          dark: "#92640a",
          light: "#e8a90e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gamer-gradient": "linear-gradient(135deg, #08080e 0%, #0d0d18 50%, #111120 100%)",
        "neon-gradient": "linear-gradient(135deg, #39FF14 0%, #22c55e 60%, #86efac 100%)",
        "gold-gradient": "linear-gradient(135deg, #92640a 0%, #f5c518 35%, #e8a90e 60%, #f5c518 80%, #92640a 100%)",
      },
      boxShadow: {
        neon: "0 0 16px rgba(57, 255, 20, 0.35), 0 0 32px rgba(57, 255, 20, 0.12)",
        "neon-sm": "0 0 8px rgba(34, 197, 94, 0.12)",
        "neon-lg": "0 0 26px rgba(57, 255, 20, 0.7), 0 0 52px rgba(57, 255, 20, 0.32)",
        gold: "0 0 0 3px rgba(201,168,76,0.25), 0 6px 24px rgba(201,168,76,0.4)",
      },
      animation: {
        "neon-pulse": "neon-pulse 2.8s ease-in-out infinite",
        "cta-glow": "cta-glow 2.4s ease-in-out infinite",
        "gold-shimmer": "gold-shimmer 3s linear infinite",
        shimmer: "shimmer 1.5s infinite",
        fadeIn: "fadeIn 0.22s ease-out both",
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": { boxShadow: "0 0 6px rgba(57, 255, 20, 0.2), inset 0 0 6px rgba(57, 255, 20, 0.04)" },
          "50%": { boxShadow: "0 0 18px rgba(57, 255, 20, 0.4), inset 0 0 10px rgba(57, 255, 20, 0.06)" },
        },
        "cta-glow": {
          "0%, 100%": { boxShadow: "0 0 14px rgba(57, 255, 20, 0.45), 0 0 28px rgba(57, 255, 20, 0.18)" },
          "50%": { boxShadow: "0 0 26px rgba(57, 255, 20, 0.7), 0 0 52px rgba(57, 255, 20, 0.32), 0 0 80px rgba(57, 255, 20, 0.1)" },
        },
        "gold-shimmer": {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "220% center" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
