// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base colors
        background: {
          DEFAULT: '#ffffff',
          secondary: '#f9fafb',
        },
        dark: {
          DEFAULT: '#111111',    // Slightly lighter than pure black
          secondary: '#1a1a1a',  // Dark gray for secondary backgrounds
          border: '#2b2b2b',     // Medium gray for borders
          accent: '#000000',     // Pure black for accents
        },
        // Text colors
        text: {
          primary: '#000000',
          secondary: '#4b5563',
          dark: {
            primary: '#ffffff',
            secondary: '#a3a3a3',
          }
        },
        // Brand colors
        brand: {
          primary: '#2563eb',
          secondary: '#3b82f6',
        }
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}
