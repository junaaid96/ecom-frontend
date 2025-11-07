import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './store/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#dc2626'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Outfit', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.7', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.015em' }],
        '2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.035em' }],
        '6xl': ['3.75rem', { lineHeight: '1.15', letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.045em' }],
        '8xl': ['6rem', { lineHeight: '1.05', letterSpacing: '-0.05em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.055em' }],
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      boxShadow: {
        soft: '0 20px 45px -30px rgba(15, 23, 42, 0.18)',
        elevated: '0 26px 60px -40px rgba(15, 23, 42, 0.22)',
        floating: '0 28px 50px -34px rgba(220, 38, 38, 0.25)',
        'glow-md': '0 0 40px rgba(220, 38, 38, 0.2)'
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.75rem',
        '3xl': '2.25rem',
        '4xl': '2.5rem'
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(0deg, transparent 24%, rgba(220, 38, 38, 0.08) 25%, rgba(220, 38, 38, 0.08) 26%, transparent 27%, transparent 74%, rgba(220, 38, 38, 0.08) 75%, rgba(220, 38, 38, 0.08) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(220, 38, 38, 0.08) 25%, rgba(220, 38, 38, 0.08) 26%, transparent 27%, transparent 74%, rgba(220, 38, 38, 0.08) 75%, rgba(220, 38, 38, 0.08) 76%, transparent 77%)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-from-right': 'slideInFromRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInFromRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: []
};

export default config;

