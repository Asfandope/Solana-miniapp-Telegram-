/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "400px",
      md: "500px",
      lg: "600px",
      xl: "1440px",
    },
    extend: {
      clipPath: {
        polygon:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Custom polygon shape
      },
      animation: {
        fadeouttopright: "fade-out-top-right 1s ease-in-out 0.25s 1",
        fadeouttoprightmine : "fade-out-top-right 0.7s ease-out 0s 1",
      },
      fontFamily: {
        lilita: ["Lilita One", "sans-serif"],
      },
      fontSize: {
        "extra-small": "0.8rem",
        small: "1.1rem",
        medium: "1.3rem",
        large: "1.6rem",
        "extra-large": "2rem",
      },
    },
  },
  plugins: [],
};
