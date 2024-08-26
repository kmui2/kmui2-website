import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Required: Add the preset to your config.
  presets: ['@pandacss/preset-base', '@park-ui/panda-preset'],

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx,astro}', './pages/**/*.{js,jsx,ts,tsx,astro}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: './src/styled-system',

  jsxFramework: 'solid',
});
