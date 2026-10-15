/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0A1A33', 2: '#13284A' },
        brand: { DEFAULT: '#FFC727', soft: '#FFF4D1' },
        bg: '#F4F6FA',
        body: '#5B6576',
        line: '#E4E8EF',
        danger: '#D7261E',
        ok: '#19A35B',
        muted: '#9AA6BA',
      },
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
      borderRadius: { '4xl': '2rem' },
      maxWidth: { site: '1240px' },
    },
  },
  plugins: [],
}
