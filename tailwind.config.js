// tailwind.config.js
module.exports = {
  content: [], // twrnc doesn't use this, but keep for parity
  theme: {
    extend: {
      colors: {
        primary: '#EB6F15',
        secondary: '#003F7D',
      },
      fontFamily: {
        // these keys become tailwind classes: font-inter, font-open-sans, font-dm-sans
        'inter': ['Inter', 'sans-serif'],
        'open-sans': ['OpenSans', 'sans-serif'],
        'dm-sans': ['DMSans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
