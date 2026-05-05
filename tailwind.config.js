/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#F7E326',
          charcoal: '#4B4F54',
          paleblue: '#DEE3EB',
          jet: '#000000',
          white: '#FFFFFF',
          teal: '#14B8A6',
          coral: '#FF6B6B',
        }
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      }
    },
  },
  plugins: [],
}
