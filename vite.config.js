import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        content: 'src/content.ts',
        background: 'src/background.ts',
        popup: resolve(__dirname, 'index.html'), // Specify the input HTML file
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        dir: 'dist', // Set output directory
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
