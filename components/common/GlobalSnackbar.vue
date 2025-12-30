<script setup lang="ts">
/**
 * Global Snackbar/Toast - Framework Agnostic
 * 框架無關的全域通知元件
 */
const { show, message, color, timeout } = useNotify()

// 自動關閉
watch(show, (newVal) => {
  if (newVal && timeout.value > 0) {
    setTimeout(() => {
      show.value = false
    }, timeout.value)
  }
})
</script>

<template>
  <Teleport to="body">
    <div class="toast-container">
      <Transition
        name="slide-fade"
        mode="out-in"
      >
        <div
          v-if="show"
          class="toast"
          :class="{
            'is-success': color === 'success',
            'is-error': color === 'error',
            'is-warning': color === 'warning',
            'is-info': color === 'info'
          }"
        >
          <div class="toast-message">
            {{ message }}
          </div>
          <button
            class="toast-close"
            @click="show = false"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
              />
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
              />
            </svg>
          </button>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
