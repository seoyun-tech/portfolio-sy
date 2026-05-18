import { defineConfig } from 'vite';

const unrovrProxy = {
  '/unrovr-proxy': {
    target: 'https://themes.pixelwars.org/unrovr/demo-01',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/unrovr-proxy/, ''),
  },
};

export default defineConfig({
  server: {
    port: 5177,
    strictPort: false,
    proxy: unrovrProxy,
  },
  preview: {
    proxy: unrovrProxy,
  },
});
