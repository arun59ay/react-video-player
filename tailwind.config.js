/** @type {import('tailwindcss').Config} */
export default {
 content: [
    './src/**/*.{js,ts,jsx,tsx}',   // For components
    './demo/**/*.{js,ts,jsx,tsx}',  // 👈 For demo files
    './demo/index.html'             // 👈 For HTML
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
