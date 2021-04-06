const colors = require("tailwindcss/colors")

// tailwind.config.js
module.exports = {
  purge: ["{app,pages}/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#FFF",
      gray: colors.gray,
      green: colors.green,
      indigo: colors.indigo,
      red: colors.red,
    },
    fontSize: {
      xxs: "0.75rem", // 12px
      xs: ["0.8125rem", "1.1375rem"], // 13px
      sm: ["0.9rem"], // 14px
      base: ["0.9375rem"], //"1.375rem"], // 15px
      lg: ["1.0625rem", "1.5625rem"], // 17px
      xl: ["1.25rem", "2rem"], // 20px
      "2xl": ["1.5rem", "1.875rem"], // 24px
      "3xl": ["2rem", "2.4375rem"], // 32px
      "4xl": "2.375rem", // 38px
      "5xl": ["2.8125rem", "4.025rem"], // 45px
      "5xl-squashed": ["2.8125rem", "3.0938rem"],
      "6xl": ["3.875rem", "4.84375rem"], // 62px
      h2: ["2.6rem"],
      h3: ["1.8rem"],
      h4: ["1.5rem"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
  ]
}
