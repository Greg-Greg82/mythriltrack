<template>
    <nav class="navbar" :class="{ shadow: hasShadow }">
      <!-- 🧙 Logo & Nom -->
      <div class="nav-left">
        <div class="logo" aria-label="Logo MythrilTrack" title="Accueil MythrilTrack">
          <svg width="48" height="48" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <circle cx="256" cy="256" r="246" stroke="#FFD700" stroke-width="20" fill="none" />
            <text x="50%" y="54%" text-anchor="middle" fill="#FFD700" font-size="48" font-family="Cinzel, serif" dy=".3em">🧙</text>
          </svg>
        </div>
        <span class="brand">MythrilTrack</span>
      </div>
  
      <!-- ☰ Burger menu -->
      <button class="burger" @click="isOpen = !isOpen" aria-label="Menu mobile">☰</button>
  
      <!-- 🌐 Liens, utilisateur & thème -->
      <div class="nav-right" :class="{ open: isOpen }">
        <router-link to="/" @click="closeMenu">Accueil</router-link>
        <router-link to="/dashboard" @click="closeMenu">Dashboard</router-link>
  
        <transition name="fade-slide">
          <div v-if="userStore.user" class="user-info">
            <span>{{ userStore.user.displayName }}</span>
            <img
              :src="userStore.user.photoURL || 'https://via.placeholder.com/32?text=🧝‍♂️'"
              alt="Avatar utilisateur"
              class="avatar"
              title="Avatar"
            />
            <button @click="handleLogout" aria-label="Déconnexion">Déconnexion</button>
            <div v-if="isLoading" class="loader" aria-label="Déconnexion en cours"></div>
          </div>
        </transition>
  
        <!-- 🌗 Thème dynamique avec SVG -->
        <button
          class="toggle-theme"
          @click="toggleTheme"
          :aria-label="isDark ? 'Passer au thème clair' : 'Passer au thème sombre'"
          :title="isDark ? 'Thème clair' : 'Thème sombre'"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gold" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFD700" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  import { signOut, getAuth } from 'firebase/auth'
  import { useUserStore } from '@/stores/user'
  
  const router = useRouter()
  const userStore = useUserStore()
  
  const isOpen = ref(false)
  const isLoading = ref(false)
  const hasShadow = ref(false)
  const isDark = ref(localStorage.getItem('theme') === 'dark')
  
  onMounted(() => {
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
    window.addEventListener('scroll', handleScroll)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  
  const toggleTheme = () => {
    isDark.value = !isDark.value
    const theme = isDark.value ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }
  
  const handleLogout = async () => {
    isLoading.value = true
    try {
      await signOut(getAuth())
      userStore.clearUser()
      router.push('/')
    } finally {
      isLoading.value = false
      closeMenu()
    }
  }
  
  const closeMenu = () => {
    isOpen.value = false
  }
  
  const handleScroll = () => {
    hasShadow.value = window.scrollY > 10
  }
  </script>
  
  <style scoped>
  .toggle-theme svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  .toggle-theme:hover svg {
    transform: rotate(20deg);
  }
  </style>
  