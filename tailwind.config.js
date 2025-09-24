/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",                // 메인 컬러
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",            // 서브 컬러
        "secondary-foreground": "var(--secondary-foreground)",
        accent: "var(--accent)",                  // 강조 색상
        "accent-foreground": "var(--accent-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
    },
  },
  plugins: [],
};
