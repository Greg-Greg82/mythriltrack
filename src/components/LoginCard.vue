<template>
  <div class="login-card">
    <div class="card">
      <img src="@/assets/mage-login.svg" alt="Mage" class="illustration" />

      <h2>Bienvenue sur <span>MythrilTrack</span></h2>
      <p class="elvish">"Edro, ammen!" – Ouvre-toi à nous.</p>

      <p>Connecte-toi pour suivre tes quêtes et forger ton destin.</p>

      <button @click="login" :disabled="loading" aria-busy="loading">
        <span v-if="!loading">Connexion Google</span>
        <div v-else class="loader" aria-label="Chargement"></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/firebase'
import { useUserStore } from '@/stores/user'
import { saveUserToFirestore } from '@/utils/firestore'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const login = async () => {
  loading.value = true
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    if (!user) throw new Error("Aucun utilisateur retourné.")

    userStore.setUser({
      displayName: user.displayName || 'Mage inconnu',
      email: user.email || '',
      photoURL: user.photoURL || '',
      uid: user.uid
    })

    await saveUserToFirestore(user)

    router.push('/dashboard')
  } catch (err) {
    console.error('❌ Erreur Firebase :', err)
    alert('⚠️ Erreur de connexion. Veuillez réessayer.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  background: linear-gradient(to bottom, #1a1a1a, #000);
  padding: 2rem;
}

.card {
  background-color: #2c2c2c;
  padding: 2rem;
  border-radius: 12px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
  animation: fadeSlideIn 0.8s ease-out;
}

.illustration {
  width: 120px;
  margin-bottom: 1rem;
}

h2 {
  color: #FFD700;
  font-family: 'Cinzel', serif;
  margin-bottom: 0.2rem;
}

.elvish {
  font-family: 'Cinzel', serif;
  font-size: 0.9rem;
  color: #FFD700;
  font-style: italic;
  text-shadow: 0 0 6px #fff2aa;
  margin-top: -0.4rem;
  margin-bottom: 1rem;
}

.card span {
  background: #FFD700;
  color: #1a1a1a;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.card p {
  color: #ccc;
  margin-bottom: 1.2rem;
}

button {
  background-color: #4285f4;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

button:hover {
  background-color: #3367d6;
}

button:disabled {
  opacity: 0.6;
  cursor: wait;
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid white;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
