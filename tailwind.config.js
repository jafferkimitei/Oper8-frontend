/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        'light-background': '#F5F1ED',  // Light background color
        'light-text': '#0A1128',        // Light text color
        'light-primary': '#001F54',
        'border': '#e5e7eb',
        'light-accent': '#DAD2BC',

        // Dark Mode Colors
        'dark-background': '#0A1128',   // Dark background color
        'dark-text': '#F5F1ED',         // Dark text color
        'dark-primary': '#FF9900',      // Primary color (dark theme)
        'dark-border': '#1f2937',
        'dark-accent': '#121f49',
      },
    },
  },
  plugins: [],
}

