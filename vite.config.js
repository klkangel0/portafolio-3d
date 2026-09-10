import { defineConfig } from 'vite';

/**
 * Configuracion de Vite.
 *
 * `base` se puede sobreescribir con la variable de entorno VITE_BASE. El flujo
 * de GitHub Actions la rellena con el nombre del repositorio para que la web
 * funcione publicada en GitHub Pages (https://usuario.github.io/repositorio/).
 * En local siempre es '/'.
 */
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  build: {
    target: 'es2020',
    // Three.js es grande por naturaleza: subimos el aviso para no ensuciar el log
    chunkSizeWarningLimit: 1400,
  },
  server: {
    open: true,
  },
});
