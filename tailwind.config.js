/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
  plugins: [],
};
