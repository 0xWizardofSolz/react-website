/** @type {import('tailwindcss').Config} */
// --- tailwind.config.js ---
// This is the configuration file for Tailwind CSS.

module.exports = {
  // Enable dark mode using a class strategy.
  // When the 'dark' class is present on the <html> element,
  // dark mode styles (e.g., `dark:bg-black`) will be applied.
  darkMode: 'class',
  
  // The 'content' array tells Tailwind which files to scan for class names.
  // This is crucial for tree-shaking (removing unused CSS) in production.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS, JSX, TS, and TSX files in the src folder
  ],
  theme: {
    // You can extend the default Tailwind theme here.
    // For example, you could add custom colors, fonts, or breakpoints.
    extend: {},
  },
  // You can add Tailwind plugins here.
  plugins: [],
}