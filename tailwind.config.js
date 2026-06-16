/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        display: ["'Playfair Display'", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: {
          950: "#080808",
          900: "#111111",
          800: "#1a1a1a",
          700: "#262626",
          600: "#333333",
          500: "#555555",
          400: "#888888",
          300: "#aaaaaa",
          200: "#cccccc",
          100: "#e8e8e8",
          50:  "#f5f5f5",
        },
      },
    },
  },
  plugins: [],
}
