/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Instrument Sans", "DM Sans", "sans-serif"],
      },
      colors: {
        ink: "#0f0f0f",
        inkMuted: "#525252",
        inkSubtle: "#737373",
        cream: "#fafaf9",
        border: "#e5e5e5",
        accent: "#18181b",
        accentMuted: "#3f3f46",
      },
    },
  },
  plugins: [],
};
