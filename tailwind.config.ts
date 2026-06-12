import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        coal: '#565656',
        sunshine: '#FCCF25',
        aero: '#FFFFFF',
        cool: '#F2F2F2',
        carbon: '#000000'
      },
      fontFamily: {
        sans: ['Aptos', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 60px rgba(0, 0, 0, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
