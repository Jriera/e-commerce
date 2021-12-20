module.exports = {
  content: [],
  theme: {

    extend: {
      fontFamily: {
        'body': ['Manrope', 'sans-serif'],
        'display': ['"Abril Fatface"', 'serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
