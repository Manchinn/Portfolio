/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        neo: "4px 4px 0px 0px rgba(0,0,0,1)",
      },
      color:{
        'neo-yellow':'#FFDE00',
        'neo-pink': '#FF90E8',
        'neo-blue': '#5471FF',
      }
    },
  },
  plugins: [],
};
