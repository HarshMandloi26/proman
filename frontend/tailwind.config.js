/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",   // blue-600
        accent: "#f97316",    // orange-500
        dark: "#0f172a",      // slate-900
      },
    },
  },
  plugins: [],
};
