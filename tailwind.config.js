/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        olive: "#6B705C",
        sage: "#A5A58D",
        nude: "#DDBEA9",
        cream: "#FFE8D6",
        charcoal: "#2E2E2E",
        indigo: "#3D405B"
      },
      boxShadow: {
        mild: "0 8px 24px rgba(0,0,0,0.08)",
        deep: "0 12px 40px rgba(0,0,0,0.10)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "serif"]
      }
    },
  },
  plugins: [],
};
