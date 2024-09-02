import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

import solidJs from '@astrojs/solid-js';
import yaml from '@rollup/plugin-yaml';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [solidJs({ devtools: true, exclude: '**/react/*' }), react()],
  vite: {
    plugins: [yaml()],
  },
});
