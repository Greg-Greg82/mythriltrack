<template>
  <div id="app">
    <Navbar />
    <main class="content">
      <transition name="fade-page" mode="out-in">
        <Suspense>
          <template #default>
            <router-view />
          </template>
          <template #fallback>
            <div class="global-loader" aria-label="Chargement...">
              🧙‍♂️ Chargement des terres du Milieu...
            </div>
          </template>
        </Suspense>
      </transition>
    </main>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<style scoped>
#app {
  font-family: var(--font-fantasy);
  background-color: var(--bg);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background 0.3s ease, color 0.3s ease;
}

.content {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
}

.global-loader {
  padding: 4rem;
  font-size: 1.3rem;
  font-family: var(--font-fantasy);
  color: var(--accent);
  text-align: center;
}

.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.4s ease;
}
.fade-page-enter-from,
.fade-page-leave-to {
  opacity: 0;
}
</style>
