// server/firebaseAdmin.js

import dotenv from 'dotenv'
import path from 'path'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// 📦 Charge les variables d'environnement depuis .env
dotenv.config()

// 📁 Pour simuler __dirname en ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 🔐 Récupère le chemin sécurisé de la clé depuis .env
const keyPath = path.resolve(process.env.FIREBASE_ADMIN_KEY || '')

// 🧪 Vérifie l'existence du fichier
if (!keyPath || !readFileSync(keyPath)) {
  throw new Error('❌ Fichier de clé Firebase introuvable. Vérifie FIREBASE_ADMIN_KEY dans .env')
}

// 🧾 Lit le contenu du fichier serviceAccountKey.json
const serviceAccount = JSON.parse(readFileSync(keyPath, 'utf-8'))

// 🚀 Initialise Firebase Admin
initializeApp({
  credential: cert(serviceAccount)
})

// 🔐 Export d’auth admin
export const adminAuth = getAuth()

console.log('✅ Firebase Admin initialisé avec succès ✅')
