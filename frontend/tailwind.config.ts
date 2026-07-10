import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#000000",
          secondary: "#0A0A0A",
          card: "#111111",
          sidebar: "#080808",
          elevated: "#161616",
        },
        border: {
          DEFAULT: "#262626",
          divider: "#303030",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#C8C8C8",
          muted: "#888888",
          disabled: "#666666",
        },
        accent: {
          DEFAULT: "#202020",
          hover: "#202020",
          active: "#2A2A2A",
        },
      },
      borderRadius: {
        sm: "10px",
        md: "14px",
        lg: "18px",
        xl: "24px",
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.25)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      maxWidth: {
        app: "1400px",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        pulse: "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
