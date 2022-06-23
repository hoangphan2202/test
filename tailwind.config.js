const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#00d6c7',
      primaryYellow: 'var(--color-primary1)',
      primaryBlack: 'var(--color-primary2)',
      primaryViolet: 'var(--color-primary3)',
      primaryBLue: 'var(--color-primary4)',
      disabled: 'rgb(64, 68, 79)',
      secondary: '#252538',
      layout: '#3A0E6D',
      black: colors.black,
      'black-2': '#1d1e20',
      black1: '#28282D',
      black3: '#28282d',
      white: colors.white,
      white1: '#F4F4F5',
      gray: colors.neutral,
      indigo: colors.indigo,
      red: colors.red,
      rose: colors.rose,
      yellow: colors.amber,
      green: colors.green,
      blue: colors.blue,
      teal: colors.teal,
      violet: colors.violet,
    },
    fontSize: {
      xs: '10.5px',
      sm: '12px',
      'sm-md2': '13px',
      'sm-md': '14px',
      md: '16px',
      base: '18px',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    extend: {
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        20: 20,
        40: 40,
        50: 50,
        60: 60,
        70: 70,
      },
      animation: {
        'fade-out': 'fade-out .2s linear forwards',
        'fade-in': 'fade-in .5s ease-out forwards',
        'fade-in-delay': 'fade-in .5s .5s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
