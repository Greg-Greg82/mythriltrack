import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'

export const saveUserToFirestore = async (user) => {
  if (!user || !user.uid) return

  try {
    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || 'Aventurier sans nom',
        email: user.email || '',
        photoURL: user.photoURL || '',
        role: user.email?.endsWith('@admin.com') ? 'admin' : 'user', // 👑
        createdAt: serverTimestamp()
      })
    }
  } catch (error) {
    console.error('❌ Erreur Firestore (users):', error.message)
    throw error
  }
}
