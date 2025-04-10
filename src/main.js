// src/main.js

// 🌐 Vue core
import { createApp } from 'vue'

// 🎨 Style global
import './style.css'

// 🧠 Composant principal
import App from './App.vue'

// 🔁 Router
import router from './router'

// 📦 Store global (Pinia) avec persistance
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 🚀 Création de l'instance Vue
const app = createApp(App)

// 🏪 Configuration du store Pinia avec plugin de persistance
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 🔌 Montage des plugins
app.use(pinia)
app.use(router)

// 🎯 Montage final de l'app
app.mount('#app')
