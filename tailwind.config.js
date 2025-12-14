/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e8f0ff',
          100: '#c0d3ff',
          200: '#97b6ff',
          300: '#6d99ff',
          400: '#3b70f2',
          500: '#1f52d3',
          600: '#1541a8',
          700: '#103489',
          800: '#0c2666',
          900: '#091c4d'
        },
        danger: '#ef4444',
        success: '#22c55e',
        warning: '#eab308'
      },
      boxShadow: {
        tablet: '0 20px 60px rgba(0, 0, 0, 0.45)',
        inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)'
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)'
      }
    }
  },
  plugins: []
};
