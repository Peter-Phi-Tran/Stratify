/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelblue: '#A1CAF1',
        pastelgreen: '#B0E57C',
        pastelpink: '#FDC1C5',
        darkgreen: '#355E3B', 
        darkblue: '#003366',
        offWhite: '#FFFCFC',
        navyblue: '#0A1653',
        calmblue: '#5468d1'
      }
    },
  },
  plugins: [],
}
