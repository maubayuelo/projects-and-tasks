import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ProjectsAndTasks/', // ✅ Ensures assets are correctly linked
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // ✅ Ensures assets go into the correct folder
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/global.scss";`,
      },
    },
  },
});
