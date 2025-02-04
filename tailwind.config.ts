import type { Config } from "tailwindcss";
const { fontFamily } = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4338ca',
        },
        secondary: {
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        accent: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        background: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
        text: {
          primary: {
            light: '#1e293b',
            dark: '#f8fafc',
          },
          secondary: {
            light: '#64748b',
            dark: '#94a3b8',
          }
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
