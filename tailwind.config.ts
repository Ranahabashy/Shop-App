import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d9efff',
          500: '#1570ef',
          600: '#0d5ed9',
          700: '#0949ab'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(2, 6, 23, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
