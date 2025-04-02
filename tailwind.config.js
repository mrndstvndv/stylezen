/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#e52525',
        'primary-dark': '#c41f1f',
        'neutral-light': '#f8f8f8',
      },
      boxShadow: {
        'bottom-sheet': '0 -4px 20px rgba(0, 0, 0, 0.1)',
      }, colors: {
        primary: '#e52525',
        'primary-dark': '#c41f1f',
        'neutral-light': '#f8f8f8',
      },
      boxShadow: {
        'bottom-sheet': '0 -4px 20px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')
  ],
};
