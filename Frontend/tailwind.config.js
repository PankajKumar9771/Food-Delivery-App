export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tomato: '#ff6347',
      },
    },
  },
  plugins: [require("daisyui")],
};
