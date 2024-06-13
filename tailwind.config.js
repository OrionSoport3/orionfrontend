/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      'min': '0.6rem',
      'letrillas': '',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem'
    },
    fontFamily: {
      'josefin': ['Josefin Sans', 'sans-serif'],
      'marcellus': ['Marcellus SC', 'serif'],
      'league': ['League Gothic', 'sans-serif'],
      'crushed': ['Crushed', 'sans-serif']
    },
    extend: {
      screens: {
        'iPad': '820px',
        'med': '1385px',
        'BP1': '768px',
        'BP1-5': '1200PX',
        'BP2': '1340px',
        'altura-si': {'raw': '(min-height: 600px)'},
        'altura-no': {'raw': '(min-height: 500px)'},
        'arturito': {'raw': '(max-height:500px)'},
        'nose': [{'raw': '(max-height:600px)'}],
        'smartwatch':{'raw': '(max-height: 410px)'},
        sm : '600px'
      },
      colors: {
        'colores-pantalla': {
          DEFAULT: '#F6F9FF',
          'info': '#D1D5E8',
        },
        'blue-button': '#020066',
        'moradito': '#A7B0E3',
        'morado-señor': '#727FBF',
        'azul-de-mujer': '#050A25',
        'azul-navbar': '#101830'
      },
      backgroundImage: {
        'design-one' : "url('/Rectangle.png')",
        'check': "url('/check-regular-240.png')",
        'fondo-it': "url('/FONDO_IT.jpeg')",
        'logo-orion': "url('/logo-orion.jpg')",
        'fondo-register': "url('/fondito.jpeg')"
      },
      width: {
        'anchito': '26rem',
        'ancho': '28rem',
        'muy-ancho': '30rem'
      }
    },
  },
  plugins: [],
}

