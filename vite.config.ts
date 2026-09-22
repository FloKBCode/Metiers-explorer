/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // L'API France Travail (auth + data) ne renvoie pas d'en-tête CORS,
    // donc un appel direct depuis le navigateur est bloqué. En dev, Vite
    // fait la requête à notre place (le serveur Vite n'est pas soumis à
    // CORS). Voir .env pour l'URL utilisée côté app (relative, via ce
    // proxy) et la note dans src/api/auth.ts pour ce qu'il faut prévoir
    // au déploiement (même souci, à résoudre côté hébergeur : Miriam).
    proxy: {
      '/ft-auth': {
        target: 'https://entreprise.francetravail.fr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ft-auth/, ''),
      },
      '/ft-api': {
        target: 'https://api.francetravail.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ft-api/, ''),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
})