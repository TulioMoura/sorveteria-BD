/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{tsx, jsx}",
    "./src/components/*.{tsx, jsx}",
    "./src/pages/**/*.{tsx, jsx}",
    "./src/pages/*.{tsx, jsx}",
    "./src/App.tsx",
  ],
  theme: {
    extend: {
      colors: {
        "rv-primary": "#B4F0E8",
        "rv-secondary": "#FFA6B9",
        "rv-pale": "#FEE9E0",
        "rv-pale-dark": "#F0C6B4"
      },
      fontFamily:{
        "quicksand": ["Quicksand", "sans"],
        "DancingScript": ['Dancing Script', "sans"],
      }
    },
  },
  plugins: [],
};
