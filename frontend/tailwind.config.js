module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "teal-blue": "#008080", // Teal Blue
        "light-blue": "#00b3b3", // Light Blue
        "light-gray": "#D3D3D3", // Light Gray
      },
      keyframes: {
        bounceOnce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15%)' },
        },
      },
      animation: {
        bounceOnce: 'bounceOnce 0.5s ease',
      },
    },
  },
  plugins: [],
};
