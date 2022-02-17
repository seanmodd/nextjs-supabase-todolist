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
        neue: 'neue-haas-grotesk-display',
      },
      colors: {
        'accent-1': '#333',
      },
    },
  },
  variants: {},
  plugins: [],
};
