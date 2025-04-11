/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: { // custom colors e1daca
        background: '#efe7da',
        darkBg: "#d0c5b5 ",
        whiteBg: '#f6f5ec',
        buttons1: '#D3D3D3',
        customMaroon: '#B22222',
        fontText: '#000000',
      },
      fontFamily: {
        balige: ['BALIGE', 'sans-serif'],
        devorana: ['DEVORANA', 'sans-serif'],
        dolce: ['DOLCE', 'sans-serif'],
        dolceBold: ['DOLCEB','sans-serif']
      },
      animation: {
        'zoom-out': 'zoomOut 1s ease-out forwards',
      },
      keyframes: {
        zoomOut: {
          '0%': { transform: 'scale(5)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'custom': '0 10px 30px rgba(0, 0, 0, 0.15), 0 15px 45px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}