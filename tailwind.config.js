/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "'./node_modules/tw-elements/dist/js/**/*.js'",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          970: "#2f2f58",
          980: "#1d1e42",
          990: "#141432",
        },
      },
    },
  },
  plugins: [],
};
