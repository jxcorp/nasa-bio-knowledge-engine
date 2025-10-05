// tailwind.config.js - Use ES Module (ESM) Syntax

/** @type {import('tailwindcss').Config} */
export default { // 💡 CHANGED: Use 'export default' instead of 'module.exports = '
  darkMode: 'class', 
  
  // 2. IMPORTANT: Tells Tailwind where to look for class names
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './dist/index.html',
  ],
  
  // 3. Theme Customization 
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 30s linear infinite', // Spin at a much slower pace
        // 'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite', // For planet glows
      },
      // You may need to define custom keyframes if 'animate-gradient-x' is also custom
    },
  },
  
  // 4. Plugins
  plugins: [],
}