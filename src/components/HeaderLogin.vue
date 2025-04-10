<template>
    <header class="header-login">
      <div class="logo" aria-hidden="true">
        <svg width="64" height="64" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <circle cx="256" cy="256" r="246" stroke="#FFD700" stroke-width="20" fill="none"/>
          <text x="50%" y="54%" text-anchor="middle" fill="#FFD700" font-size="48" font-family="Cinzel, serif" dy=".3em">
            🧙
          </text>
        </svg>
      </div>
  
      <h1>Bienvenue sur MythrilTrack</h1>
      <p>Suivez vos quêtes comme un vrai mage !</p>
  
      <button
        @click="login"
        :disabled="loading"
        aria-busy="loading"
        aria-label="Connexion avec Google"
      >
        <span v-if="!loading">Se connecter avec Google</span>
        <div v-else class="loader" aria-hidden="true"></div>
      </button>
  
      <!-- ✅ Message d’erreur plus user-friendly -->
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
    </header>
  </template>
  
  <script setup>
  import { signInWithPopup } from 'firebase/auth'
  import { auth, provider } from '@/firebase'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  import { ref } from 'vue'
  
  const router = useRouter()
  const userStore = useUserStore()
  const loading = ref(false)
  const errorMessage = ref('')
  
  const login = async () => {
    loading.value = true
    errorMessage.value = ''
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      userStore.setUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
      })
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
      errorMessage.value = "Impossible de se connecter. Réessaie."
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .header-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 1rem;
    text-align: center;
    background: var(--bg, #1a1a1a);
    color: var(--text, #fff);
  }
  
  .logo svg {
    animation: pulse 2s ease-in-out infinite alternate;
    margin-bottom: 1rem;
  }
  
  @keyframes pulse {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.05);
    }
  }
  
  h1 {
    font-family: 'Cinzel', serif;
    color: #FFD700;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    color: #ccc;
  }
  
  .error-msg {
    color: #ff6b6b;
    font-size: 0.9rem;
    margin-top: 1rem;
  }
  
  button {
    background-color: #4285f4;
    color: white;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.3s ease;
  }
  
  button:hover:not(:disabled) {
    background-color: #357ae8;
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
  </style>
  