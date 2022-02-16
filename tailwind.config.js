module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        gtamerica: 'Eurostile-Regular',
      },
      colors: {
        'accent-1': '#333',
      },
    },
  },
  variants: {},
  plugins: [],
};
