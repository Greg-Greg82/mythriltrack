<template>
    <div class="login">
      <h1>Connexion à <span>MythrilTrack</span></h1>
      <button @click="login" :disabled="loading">
        <span v-if="!loading">Se connecter avec Google</span>
        <div v-else class="loader"></div>
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { signInWithPopup } from 'firebase/auth'
  import { auth, provider } from '@/firebase'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  import { saveUserToFirestore } from '@/utils/firestore' // 🔁 Bonus : persistance Firestore
  
  const router = useRouter()
  const userStore = useUserStore()
  const loading = ref(false)
  
  const login = async () => {
    loading.value = true
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
  
      userStore.setUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
      })
  
      await saveUserToFirestore(user) // 🔁 Optionnel mais recommandé
  
      router.push('/dashboard')
    } catch (error) {
      console.error("❌ Erreur de connexion :", error.message)
      alert("⚠️ Une erreur est survenue lors de la connexion Google.")
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4rem;
    text-align: center;
  }
  
  h1 {
    color: #FFD700;
    font-family: 'Cinzel', serif;
    margin-bottom: 1rem;
  }
  
  h1 span {
    background: #FFD700;
    color: #1a1a1a;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
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
    gap: 0.5rem;
  }
  
  button:hover {
    background-color: #3367d6;
  }
  
  button:disabled {
    opacity: 0.6;
    cursor: wait;
  }
  
  .loader {
    width: 18px;
    height: 18px;
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
  </style>
  