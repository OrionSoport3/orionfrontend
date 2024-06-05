/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    fontFamily: {
      'josefin': ['Josefin Sans', 'sans-serif'],
      'marcellus': ['Marcellus SC', 'serif']
    },
    extend: {
      colors: {
        'colores-pantalla': {
          DEFAULT: '#F6F9FF',
          'info': '#D1D5E8',
        },
        'blue-button': '#020066',
        'moradito': '#A7B0E3',
        'morado-señor': '#727FBF',
        'azul-de-mujer': '#050A25'
      },
      backgroundImage: {
        'design-one' : "url('/Rectangle.png')",
        'check': "url('/check-regular-240.png')",
        'fondo-it': "url('/FONDO_IT.jpeg')"
      }
    },
  },
  plugins: [],
}

