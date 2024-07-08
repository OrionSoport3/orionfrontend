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
      'crushed': ['Crushed', 'sans-serif'],
      'alumni-sans': ['Alumni Sans', 'sans'],
      'mukta': ['Mukta Malar', 'sans-serif']
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
          'form': "#DFDFE6",
        },
        'blue-button': '#020066',
        'moradito': '#A7B0E3',
        'morado-señor': '#727FBF',
        'azul-de-mujer': '#050A25',
        'azul-navbar': '#101830',
        'azulaso': "#64889B",
        'azulote': "#273B4E",
        'azul-hombre': "#1A2533",
        'azul-gris': "#B1C7CD",
        'pricha' : "#8190E1",
        'moradito': "#171E3F",
        'azuleh':"#A7B0E3",
        'morado-beli': "",
        'Belize': "#CAD0EE",
        'gris': "#3D445A",
      },
      backgroundImage: {
        'design-one' : "url('/Rectangle.png')",
        'check': "url('/check-regular-240.png')",
        'fondo-it': "url('/FONDO_IT.jpeg')",
        'logo-orion': "url('/logo-orion.jpg')",
        'fondo-register': "url('/fondito.jpeg')",
        'fondito': "url('/fondo_restablecer.jpeg')",
        'rectangulo-azul': "url('/Rectangle_melt.png')",
        'logout-white': "url('/logout-white.png')",
        'unchecked': "url('/checkbox-regular.png')"
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

