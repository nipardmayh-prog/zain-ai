/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ZAIN Brand Colors
        zn: {
          50: '#e6f2ff',
          100: '#b3d9ff',
          200: '#80bfff',
          300: '#4da6ff',
          400: '#1a8cff',
          500: '#0A84FF',  // Primary ZN Blue
          600: '#0070e0',
          700: '#005cbf',
          800: '#00479e',
          900: '#00337d',
          950: '#001a40',
        },
        ai: {
          50: '#e6fff5',
          100: '#b3ffe1',
          200: '#80ffcc',
          300: '#4dffb8',
          400: '#1affa3',
          500: '#00FFB2',  // Secondary AI Green
          600: '#00e09d',
          700: '#00bf87',
          800: '#009f71',
          900: '#007f5a',
          950: '#003f2d',
        },
        dark: {
          950: '#020810',
          900: '#040d1a',
          800: '#081525',
          700: '#0c1f38',
          600: '#10294b',
          500: '#14335e',
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at center, rgba(10, 132, 255, 0.15) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(10, 132, 255, 0.3)',
        'glow-green': '0 0 20px rgba(0, 255, 178, 0.3)',
        'glow-brand': '0 0 30px rgba(10, 132, 255, 0.2), 0 0 60px rgba(0, 255, 178, 0.1)',
      }
    },
  },
  plugins: [],
}
