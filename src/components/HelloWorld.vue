<script setup>
import { ref } from 'vue'

const props = defineProps({
  msg: {
    type: String,
    default: 'Bienvenue !'
  }
})

const count = ref(0)
</script>

<template>
  <h1 v-if="props.msg">{{ props.msg }}</h1>
  <h1 v-else>Bienvenue dans le composant !</h1>

  <div class="card">
    <button type="button" @click="count++">
      Compteur : {{ count }}
    </button>
    <p>
      Modifie le fichier
      <code>components/HelloWorld.vue</code>
      pour tester le HMR.
    </p>
  </div>

  <p>
    Découvre
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank" rel="noopener noreferrer">
      create-vue
    </a>,
    le starter officiel Vue + Vite.
  </p>
  <p>
    Apprends à configurer ton IDE dans le
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      rel="noopener noreferrer"
    >
      guide Vue sur l’environnement de dev
    </a>.
  </p>
  <p class="read-the-docs">Clique sur les logos Vite et Vue pour en savoir plus.</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.card {
  margin-top: 1rem;
}

button {
  background-color: #42b983;
  color: white;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #369d73;
}
</style>
