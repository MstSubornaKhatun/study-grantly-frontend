// tailwind.config.js
import daisyui from "daisyui"

export default {
  content: ["./index.html", "./src//*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#640d14",
          secondary: "#f4a261",
          accent: "#264653",
          neutral: "#1e1e1e",
          "base-100": "#f9fafb", // background
          "base-content": "#1e1e1e", // text
        },
      },
      {
        dark: {
          primary: "#640d14",
          secondary: "#f4a261",
          accent: "#264653",
          neutral: "#f9fafb",
          "base-100": "#121212", // background
          "base-content": "#f9fafb", // text
        },
      },
    ],
  },
}