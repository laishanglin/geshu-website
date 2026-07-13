/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3B82F6',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A5F',
          950: '#0A1628',
        },
        accent: {
          DEFAULT: '#06B6D4',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', 'sans-serif'],
        mono: ['Inter', 'SF Mono', 'Fira Code', 'monospace'],
      },
      maxWidth: {
        'page': '1700px',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #2563EB 0%, #0891B2 100%)',
        'hero-radial': 'radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 60px rgba(59, 130, 246, 0.4)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 50px rgba(59, 130, 246, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'border-flow': 'borderFlow 3s linear infinite',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
    },
  },
  plugins: [],
}
