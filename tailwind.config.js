/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        'juggernaut-dark': '#0A0A0A', // Almost black, for main backgrounds
        'juggernaut-medium': '#1A1A1A', // Slightly lighter for cards/sections
        'juggernaut-light': '#2A2A2A', // Even lighter for subtle elements

        // Accent colors
        'juggernaut-accent-1': '#00F0FF', // A bright, electric blue/cyan
        'juggernaut-accent-2': '#FF00A0', // A vibrant magenta/pink

        // Text colors
        'juggernaut-text-light': '#E0E0E0', // Light gray for primary text
        'juggernaut-text-muted': '#A0A0A0', // Muted gray for secondary text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Set Inter as the default sans-serif font
      },
    },
  },
  plugins: [],
}