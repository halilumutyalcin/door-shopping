import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#fdf8f0',
          100: '#f5e6d0',
          200: '#ebcda1',
          300: '#d4a574',
          400: '#c08b52',
          500: '#a0714a',
          600: '#8b5e3c',
          700: '#6f4a2e',
          800: '#5a3c25',
          900: '#4a311f',
          950: '#2d1d12',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#d4a017',
          600: '#b8860b',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        wood: {
          oak: '#c8a97e',
          walnut: '#5c4033',
          cherry: '#a0522d',
          maple: '#d4a76a',
          ebony: '#3c2415',
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
