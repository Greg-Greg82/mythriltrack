<!-- src/views/Login.vue -->
<template>
    <div class="login-view">
      <LoginCard />
    </div>
  </template>
  
  <script setup>
  import LoginCard from '@/components/LoginCard.vue'
  </script>
  
  <style scoped>
  .login-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(145deg, #1e1e1e, #2a2a2a);
    animation: fadeIn 0.8s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  