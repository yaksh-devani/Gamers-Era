/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: '#121212', 
        'primary-dark': '#1C1C1C',
        'primary-light': '#B0BEC5',
        secondary: '#D90429',
      },
      fontSize: {
        h1: [
          "2rem",
          {
            fontWeight: 300,
            lineHeight: "2.5rem",
            letterSpacing: "-0.0313rem",
          },
        ],
        "h2-light": ["1.5rem", { fontWeight: 300, lineHeight: "1.875rem" }],
        "h2-medium": ["1.5rem", { fontWeight: 500, lineHeight: "1.1875rem" }],
        h3: ["1.125rem", { fontWeight: 500, lineHeight: "1.4375rem" }],
        "body-1": ["0.9375rem", { fontWeight: 300, lineHeight: "1.1875rem" }],
        "body-2": ["0.8125rem", { fontWeight: 300, lineHeight: "1rem" }],
      },
    },
  },
  plugins: [],
};
