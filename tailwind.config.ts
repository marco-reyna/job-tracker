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
        teal: "#15616d",
        tangerine: "#ff7d00",
        strawberry: "#ff0035",
        black: "#040404",
        dust: "#d7d9ce",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
