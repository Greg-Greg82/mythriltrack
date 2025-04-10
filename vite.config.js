// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// 🔧 Configuration dynamique selon l'environnement
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)) // ✅ Accès rapide à src/
      }
    },

    define: {
      __APP_ENV__: JSON.stringify(mode) // ✅ Accès global à l’environnement (utile pour logs / endpoints)
    },

    build: {
      target: 'esnext',                  // ✅ Code moderne, rapide à charger
      outDir: 'dist',                    // ✅ Dossier de sortie
      assetsDir: 'assets',               // ✅ Sous-dossier pour les assets
      minify: 'esbuild',                 // ✅ Ultra rapide (par défaut)
      sourcemap: mode !== 'production',  // 🔍 Utile en dev, désactivé en prod

      rollupOptions: {
        output: {
          manualChunks(id) {
            // ✅ Split automatique des dépendances en chunks nommés
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0]
            }
          }
        }
      }
    },

    server: {
      port: 3000,   // 🌍 http://localhost:3000
      open: true    // ✅ Ouvre le navigateur automatiquement
    }
  }
})
