import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom color palette
        orange: {
          DEFAULT: "#EA9010",
          50: "#FEF7E6",
          100: "#FDECC0",
          200: "#FBD885",
          300: "#F8C34A",
          400: "#F5AE1F",
          500: "#EA9010",
          600: "#D17A0C",
          700: "#B86409",
          800: "#9F4E06",
          900: "#863803",
        },
        "red-accent": {
          DEFAULT: "#F15025",
          50: "#FEF2F0",
          100: "#FDE2DC",
          200: "#FBC5B9",
          300: "#F8A896",
          400: "#F58B73",
          500: "#F15025",
          600: "#E63E1A",
          700: "#DB2C0F",
          800: "#D01A04",
          900: "#C50800",
        },
        "brown-dark": "#7A542E",
        "purple-dark": "#773344",
        "pink-soft": "#BF8B85",
        "cream-light": "#F2E2D2",
        "sage-green": "#BCC1BA",
        "blue-gray": "#9FB7B9",
        "teal-dark": "#204346",
        "cyan-bright": {
          DEFAULT: "#46B1C9",
          50: "#F0F9FB",
          100: "#E1F3F7",
          200: "#C3E7EF",
          300: "#A5DBE7",
          400: "#87CFDF",
          500: "#46B1C9",
          600: "#3A9BB5",
          700: "#2E85A1",
          800: "#226F8D",
          900: "#165979",
        },
        "peach-warm": "#F8AB81",
        "tan-warm": "#C7B590",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
