/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{tsx, jsx}",
    "./src/components/*.{tsx, jsx}",
    "./src/pages/**/*.{tsx, jsx}",
    "./src/pages/*.{tsx, jsx}"
  ],
  theme: {
    extend: {
      colors:{
        "color-primary": "#F26699",
        "color-secondary": "#D96A88",
        "color-terciary": "#96D9CC"
      }
    },
  },
  plugins: [],
}

