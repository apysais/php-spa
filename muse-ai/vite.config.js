import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base MUST match Apache subfolder + /build/
// Local URL http://learn.local/php-spa/muse-ai => base /php-spa/muse-ai/build/
// In production if app lives at / => change to /build/ or /assets/
export default defineConfig({
  plugins: [react()],
  base: '/php-spa/muse-ai/build/',
  build: {
    outDir: 'build',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: 'src/main.jsx'
    }
  }
});
