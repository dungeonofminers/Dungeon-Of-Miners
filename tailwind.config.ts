import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#0A0C0F",
          50: "#1A1F26",
          100: "#12161C",
          200: "#0D0F12",
          300: "#0A0C0F",
        },
        stone: {
          800: "#2F3640",
          900: "#232933",
        },
        gold: {
          DEFAULT: "#F4B544",
          light: "#FCD98A",
          dark: "#D98A1E",
        },
        torch: {
          DEFAULT: "#FF8A2A",
          ember: "#B94A1D",
        },
        emerald: {
          glow: "#3FA97A",
        },
        ink: {
          DEFAULT: "#F5F5F5",
          muted: "#A9B0BC",
          faint: "#6B7280",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
        "grain": "url('/assets/texture-noise.png')",
      },
      boxShadow: {
        "glow-gold": "0 0 40px -8px rgba(244, 181, 68, 0.45)",
        "glow-torch": "0 0 50px -10px rgba(255, 138, 42, 0.55)",
        "inner-line": "inset 0 1px 0 0 rgba(255,255,255,0.05)",
      },
      animation: {
        "flicker": "flicker 4s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-slower": "float 9s ease-in-out infinite",
        "drift": "drift 18s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "48%": { opacity: "0.85" },
          "50%": { opacity: "0.6" },
          "52%": { opacity: "0.9" },
          "70%": { opacity: "0.75" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%": { transform: "translateY(0) translateX(0)" },
          "100%": { transform: "translateY(-1000px) translateX(60px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
