// ✅ server/firebaseAdmin.js
import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

// 🧭 Chemin du fichier courant (__dirname simulé en ESM)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 📁 Chemin vers la clé de service
const serviceAccountPath = path.resolve(__dirname, './serviceAccountKey.json')

// 🔐 Lecture sécurisée du fichier de clé
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'))

// 🚀 Initialisation de Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
})

// 📦 Export de l’auth admin (prêt pour les rôles & vérifs)
export const adminAuth = getAuth()
