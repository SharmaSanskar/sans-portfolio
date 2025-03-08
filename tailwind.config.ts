import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: {
          DEFAULT: "#0D000D", // Darker background
          light: "#F8F2FF", // Light mode background
        },
        fontPrimary: {
          DEFAULT: "#FBE4D8", // Dark mode text
          light: "#1F0A21", // Light mode text
        },
        fontSecondary: {
          DEFAULT: "#DFB6B2", // Dark mode secondary text
          light: "#3B1A41", // Light mode secondary text
        },
        accentPurple1: {
          DEFAULT: "#140319", // Darker accent
          light: "#F1E3F9", // Light mode accent
        },
        accentPurple2: {
          DEFAULT: "#2A1130", // Darker accent
          light: "#E0C6E9", // Light mode accent
        },
        accentPurple3: {
          DEFAULT: "#3C1E33", // Darker accent
          light: "#D2B1DE", // Light mode accent
        },
        accentPurple4: {
          DEFAULT: "#452C3B", // Darker accent
          light: "#C092CF", // Light mode accent
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      fontFamily: {
        sora: ["Sora", "sans-serif"],
        alegreya: ["Alegreya", "serif"],
        cairo: ["Cairo", "sans-serif"],
        fauna: ["Fauna One", "serif"],
        karma: ["Karma", "serif"],
        merriweather: ["Merriweather", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        lora: ["Lora", "serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
