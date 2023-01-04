/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
      extend: {
          keyframes: {
              appearing: {
                  '0%': {
                      opacity: 0
                  },
                  '100%': {
                      opacity: 1
                  }
              }
          },
          animation: {
              appearing: 'appearing .7s linear 1'
          }
      }
  },
  plugins: []
};