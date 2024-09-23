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
        background: "var(--background)",
        foreground: "var(--foreground)",
        purpleProject: "#E0BCF1",
        yellowProject: "#F3E110",
        redProject: "#FF6A6A",
        greenProject: "#12F023",
        pinkProject: "#FF5CC8",
        fontProject: "#CECECE",
        bgProject: "#242424",
        blueProject: "#BCCFF1",
        fontProjectBlack: "#4D4D4D", 
      },
    },
  },
  plugins: [],
};
