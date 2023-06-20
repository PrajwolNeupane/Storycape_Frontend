
tailwind.config = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        'primary-main': "#bfbfbf",
        'primary-mid': "#e0e0e0",
        'primary-light': "#F4F4F4",
        'secondary-main': "#FF6924",
        'secondary-mid': "#FB7315",
        'secondary-light': "#FF9A16",
        'secondary-dark': "#8a8a8a",
        'text-main': "#161517",
        'text-mid': "#282629",
        'text-light': '#3c3b3d',
        'fail': '#FF0000',
        'success': "#4BB543",
      },
      fontSize: {
        xl: '30px',
        lg: "25px",
        md: "20px",
        sm: "18px",
        xs: "16px",
        xxs: "14px"
      },

    },
  },
  plugins: [],
}
