/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          teal: "#075E54",
          green: "#25D366",
          darkGreen: "#128C7E",
          light: "#DCF8C6",
          bg: "#EFEAE2",
          chatBg: "#ECE5DD",
        },
        careem: {
          green: "#00EB80",
          dark: "#0F281E",
        },
      },
    },
  },
  plugins: [],
};
