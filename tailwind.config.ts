import type { Config } from 'tailwindcss';

// Tokens extraídos de docs/key-visual.png. Mantener sincronizados con :root en app/globals.css.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: '#0A6CE0',
        logo: '#1F5FE0',
        mario: {
          yellow: '#FFC400',
          green: '#2EA83C',
          red: '#E3262B',
          grass: '#5BC236',
          dirt: '#E7A33C',
          coin: '#F5C518',
          ink: '#1A1A1A',
          hill: '#3FB8B0',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        pixel: ['var(--font-pixel)', 'monospace'],
      },
      boxShadow: {
        block: '0 4px 0 #1A1A1A',
        card: '0 6px 0 #1A1A1A',
      },
    },
  },
  plugins: [],
};

export default config;
