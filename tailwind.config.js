// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Usa 'class' para activar dark mode usando .dark en body o html
  theme: {
    extend: {
      colors: {
        // Puedes agregar tus propios colores si quieres, ejemplo:
        vscodegreen: '#4EC9B0',
        vscodeyellow: '#F9F1A5',
        vscodeblue: '#569CD6',
        vscodemagenta: '#C586C0',
        vstextsoft: '#bcbcbc',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
        sans: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
