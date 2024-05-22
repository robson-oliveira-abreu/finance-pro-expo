/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/infra/App.{js,jsx,ts,tsx}", "./src/ui/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#61ED5E",

        shape: "#FFFFFF",
        shapeSecondary: "#DFDFDF",
        shapeDark: "#222222",
        shapeDarkSecondary: "#333333",
        danger: "#FF3939",
        success: "#61ED5E",
        warn: "#FC784F",

        background: "#FFFFFF",
        backgroundSecondary: "#E6E6E6",
        text: "#111111",
        textSecondary: "#444444",
        textInfo: "#888888",

        "dark-background": "#000000",
        "dark-backgroundSecondary": "#333333",
        "dark-text": "#FFFFFF",
        "dark-textSecondary": "#D7D7D7",
        "dark-textInfo": "#b7b7b7",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
