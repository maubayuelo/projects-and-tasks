/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navyBlue: "#13293d",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Replace system-ui with Inter
      },
    },
  },
  plugins: [],
};
