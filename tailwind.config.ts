import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:        "#fb923c",
        accent:         "#303033",
        error:          "#f87171",
        ink:            "#fafafa",
        surface:        "#18181b",
        fg:             "#27272a",
        "badge-green":  "#4ade80",
        "badge-blue":   "#38bdf8",
        "badge-purple": "#e879f9",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
