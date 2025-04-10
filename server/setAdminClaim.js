// ✅ server/setAdminClaim.js
import { adminAuth } from './firebaseAdmin.js'

// 🔁 Remplace par l’UID réel de l’utilisateur que tu veux promouvoir
const uid = 'UID_FIREBASE_UTILISATEUR'

adminAuth.setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`✅ Rôle admin attribué à l'utilisateur ${uid}`)
    process.exit(0) // 🛑 Termine le script proprement
  })
  .catch((error) => {
    console.error('❌ Erreur lors de l’attribution du rôle admin :', error)
    process.exit(1)
  })
