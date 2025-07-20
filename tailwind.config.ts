import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pure-white': '#FFFFFF',
        'rich-black': '#111111',
        'graphite': '#2D2D2D',
        'limestone': '#F1F1F0',
        'auxo-green': '#9ACD32',
        'petrol-ink': '#0A3A4A',
      },
      fontFamily: {
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
        'cairo': ['var(--font-cairo)', 'sans-serif'],
      },
      fontWeight: {
        'extra-bold': '800',
      },
    },
  },
  plugins: [],
}
export default config