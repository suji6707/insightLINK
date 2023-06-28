/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./src/styles/dashboard.css"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        NodeColor1: "#5470C6",
        NodeColor2: "#91CC75",
        NodeColor3: "#FAC858",
        NodeColor4: "#EE6666",
        NodeColor5: "#73C0DE",
        NodeColor6: "#3BA272",
        NodeColor7: "#FC8452",
        NodeColor8: "#9A60B4",
        NodeColor9: "#EA7CCC",
      },
    },
  },
  plugins: [],
};
