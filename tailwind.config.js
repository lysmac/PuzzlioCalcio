/** @type {import('tailwindcss').Config} */
import { createThemes } from "tw-colors";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      colors: {
        "lt-bg": "#EDF1FD",
        "lt-text": "#1B1537",
        "dt-bg": "#120A2E",
        "dt-text": "#FAFAFF",
        "gt-bg": "#FDE9EB",
        "gt-text": "#251C34",
        "pc-green": "#28D79D",
        "pc-yellow": "#F0C54F",
      },
      fontFamily: {
        "pc-text": ["Raleway", "sans-serif"],
      },
    },
  },
  darkMode: "class",

  plugins: [
    createThemes({
      light: {
        "primary-bg": "#EDF1FD",
        "primary-text": "#1B1537",
        "primary-contrast": "#120A2E",
      },
      dark: {
        "primary-bg": "#120A2E",
        "primary-text": "#FAFAFF",
        "primary-contrast": "#EDF1FD",
      },
      gazzetta: {
        "primary-bg": "#FDE9EB",
        "primary-text": "#251C34",
        "primary-contrast": "#120A2E",
      },
    }),
  ],
};
