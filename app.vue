<script setup lang="ts">
import { useLoading } from '~/composables/useLoading' // Explicit import not strictly needed if auto-imported, but good for clarity. Actually Nuxt auto-imports. I will rely on auto-import or explicit. Let's remove import since I'm removing the store import.

console.log('APP.vue')
const token = useCookie('token')
// 設定登入 token
token.value = 'abc123'

const { isLoading } = useLoading()
</script>
<template>
  <div
    v-if="isLoading"
    class="global-loading"
  >
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* background: rgba(255, 255, 255, 0.7); Light theme overlay */
  background: rgba(0, 0, 0, 0.2); /* Darker overlay for better contrast */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px); /* Glassmorphism effect */
  transition: all 0.3s ease;
}

/* Spinner Styles (Double Bounce) */
.spinner {
  width: 60px;
  height: 60px;
  position: relative;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #3498db; /* Primary Blue */
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  animation-delay: -1s;
  background-color: #2ecc71; /* Secondary Green */
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
