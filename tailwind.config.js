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
    "./public/index.html" // Include HTML file for any classes used there
  ],
  theme: {
    // You can extend the default Tailwind theme here.
    // For example, you could add custom colors, fonts, or breakpoints.
    extend: {
      // Add performance-optimized animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  // You can add Tailwind plugins here.
  plugins: [],
  // Configure safelist for dynamically generated classes
  safelist: [
    'theme-transition',
    'fancy-cursor-dot',
    'link-hover',
    'text-hover',
    'resize-hover'
  ]
}