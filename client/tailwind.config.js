/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "flash-green": "flashGreen 0.5s ease-in-out",
        "flash-red": "flashRed 0.5s ease-in-out",
        moveDiagonal: "moveDiagonal 4s linear infinite",
      },
      keyframes: {
        flashGreen: {
          "0%, 100%": { color: "#10b981" },
          "50%": { color: "#22c55e" },
        },
        flashRed: {
          "0%, 100%": { color: "af503c" },
          "50%": { color: "#cc3300" },
        },
        moveDiagonal: {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "100%": { transform: "translate(100vw, 100vh)", opacity: "0" }, // Move to bottom-right
        },
      },
    },
  },
  plugins: [],
};
