<template>
    <div class="login-view">
      <HeaderLogin />
  
      <main class="login-container" role="main">
        <LoginCard />
      </main>
    </div>
  </template>
  
  <script setup>
  import HeaderLogin from '@/components/HeaderLogin.vue'
  import LoginCard from '@/components/LoginCard.vue'
  </script>
  
  <style scoped>
  .login-view {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(145deg, #1e1e1e, #2a2a2a);
    color: #ffffff;
  }
  
  /* 🌠 Animation à l’arrivée du bloc de connexion */
  .login-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    animation: fadeSlideIn 0.8s ease-out;
  }
  
  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* 📱 Responsive */
  @media (max-width: 768px) {
    .login-container {
      padding: 1.5rem 1rem;
    }
  
    .login-view {
      text-align: center;
    }
  }
  </style>
  