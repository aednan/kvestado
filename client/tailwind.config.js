module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-bg": "url('/img/cexchange.svg')",
      },
    },
  },
  plugins: [require("@tailwindcss/typography", "@tailwindcss/aspect-ratio")],
};
