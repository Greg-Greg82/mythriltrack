<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useUserStore } from '@/stores/user'
import { saveUserToFirestore } from '@/utils/firestore'

// 🔐 États locaux pour le formulaire
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const router = useRouter()
const userStore = useUserStore()

// 🚀 Fonction d'inscription utilisateur
const register = async () => {
  loading.value = true
  errorMessage.value = ''

  // ✅ Validation minimale
  if (!email.value || !password.value || password.value.length < 6) {
    errorMessage.value = '⚠️ Merci de fournir un email valide et un mot de passe de minimum 6 caractères.'
    loading.value = false
    return
  }

  try {
    // 🔐 Création d’un compte via Firebase Auth
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value
    )

    // 🧠 Enregistrement local via Pinia
    userStore.setUser({
      displayName: user.displayName || 'Nouvel aventurier',
      email: user.email,
      photoURL: user.photoURL || '',
      uid: user.uid
    })

    // ☁️ Enregistrement Firestore si nouveau
    await saveUserToFirestore(user)

    // ✅ Redirection après inscription
    router.push('/dashboard')
  } catch (err) {
    errorMessage.value = `⚠️ ${err.message || 'Erreur lors de l’inscription.'}`
  } finally {
    loading.value = false
  }
}
</script>
