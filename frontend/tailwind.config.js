module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
  
    extend: {
      spacing: {
        '3px': '3px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
