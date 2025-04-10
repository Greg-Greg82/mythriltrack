// src/stores/user.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const setUser = (userData) => {
    if (!userData || typeof userData !== 'object') return
    user.value = {
      displayName: userData.displayName || 'Utilisateur',
      email: userData.email || '',
      photoURL: userData.photoURL || '',
      uid: userData.uid || ''
    }
  }

  const clearUser = () => {
    user.value = null
  }

  const isLoggedIn = computed(() => user.value !== null)

  return {
    user,
    setUser,
    clearUser,
    isLoggedIn
  }
}, {
  persist: {
    key: 'user', // ✅ Nom explicite dans localStorage
    storage: localStorage
  }
})
