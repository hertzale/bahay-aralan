/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif:  ['Libre Baskerville', 'Georgia', 'serif'],
        body:   ['Crimson Pro', 'Georgia', 'serif'],
        mono:   ['DM Mono', 'monospace'],
      },
      colors: {
        cream:  '#F3EFE9',
        sand:   '#E0C1A4',
        mocha:  '#AD8D6D',
        khaki:  '#695E3B',
        forest: '#4F522C',
        navy:   '#4C6B8E',
        dark:   '#372B1C',
        ivory:  '#FDFAF6',
      },
    },
  },
  plugins: [],
}