/** @type {import('tailwindcss').Config} */
export default {
  // 👇 ESTO ES LO IMPORTANTE
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
