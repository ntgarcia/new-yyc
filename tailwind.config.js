/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Tight", "sans-serif"],
      },
      colors: {
        accent: "#C8102E",
        hover: "#D9D9D9",
        background: "#FFFFFF",
        card: "#F8F9FA",
        text: {
          primary: "#1A1A1A",
          secondary: "#6B7280",
          accent: "#C8102E",
        },
        success: "#22C55E",
        border: "#E5E7EB",
      },
      borderRadius: {
        card: "0.75rem",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#6B7280",
            a: {
              color: "#C8102E",
              "&:hover": {
                color: "#C8102E",
                opacity: 0.9,
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
