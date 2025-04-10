// ✅ server/index.js (ESM)
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { adminAuth } from './firebaseAdmin.js'

const app = express()
const PORT = process.env.PORT || 5001

// ✅ Middleware
app.use(cors({ origin: true }))
app.use(express.json())

// 🧪 Healthcheck
app.get('/health', (req, res) => {
  res.status(200).send('🔥 API backend admin active')
})

// 🔐 Vérifie le rôle admin
app.post('/api/verifyAdmin', async (req, res) => {
  const { idToken } = req.body

  if (!idToken) {
    return res.status(400).json({ error: 'Token Firebase requis.' })
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken)
    const isAdmin = decodedToken.admin === true

    res.json({
      uid: decodedToken.uid,
      email: decodedToken.email,
      isAdmin
    })
  } catch (error) {
    console.error('❌ Erreur de vérification Firebase :', error.message)
    res.status(401).json({ error: 'Token invalide ou expiré.' })
  }
})

// 🚀 Lancement serveur
app.listen(PORT, () => {
  console.log(`✅ Admin backend prêt sur http://localhost:${PORT}`)
})
