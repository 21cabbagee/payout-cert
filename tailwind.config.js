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
        background: '#080c16',
        surface: '#0d1424',
        'surface-elevated': '#141e34',
        'surface-hover': '#1b2946',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-strong': 'rgba(255, 255, 255, 0.16)',
        cert: {
          gold: '#f59e0b',
          amber: '#d97706',
          emerald: '#10b981',
          blue: '#3b82f6',
          indigo: '#6366f1',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Geist Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Geist Mono', 'monospace'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
