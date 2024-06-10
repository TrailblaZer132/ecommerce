/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          black: "#191919",
          red: {
            normal: "#d72a2e",
            hover: "#b71b1e",
          },
          yellow: "#FFBB00",
          green: {
            normal: "#26A541",
            hover: "#1E8D3B",
          },
          orange: "#FF7900",
          gray: "#262626",
          button: {
            normal: "#fb641b",
            hover: "#d65718",
          },
        },
        light: {
          white: "#ffffff",
          gray: "#e6e6e6",
          red: "#fcf5f5",
          yellow: "#fff8e6",
          lightRed: "#ffe0e0",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
