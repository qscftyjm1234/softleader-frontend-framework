<script setup lang="ts">
const router = useRouter()
const goHome = () => router.push('/')
const goShowcase = () => router.push('/showcase')
</script>

<template>
  <div class="error-page">
    <div class="error-bg-decoration" />

    <div class="error-content">
      <!-- Error Icon with Glow -->
      <div class="error-icon-wrapper">
        <div class="error-icon-glow" />
        <div class="error-icon-container">
          <v-icon
            color="orange-400"
            size="80"
          >
            mdi-alert-circle-outline
          </v-icon>
        </div>
      </div>

      <!-- Error Code -->
      <div class="error-code">404</div>

      <!-- Error Message -->
      <h1 class="error-title">找不到頁面</h1>
      <p class="error-description">抱歉,您所尋找的頁面不存在或已被移除。</p>

      <!-- Action Buttons -->
      <div class="error-actions">
        <button
          class="error-btn error-btn-primary"
          @click="goHome"
        >
          <v-icon
            size="20"
            class="mr-2"
          >
            mdi-home
          </v-icon>
          返回首頁
        </button>
        <button
          class="error-btn error-btn-secondary"
          @click="goShowcase"
        >
          <v-icon
            size="20"
            class="mr-2"
          >
            mdi-view-grid-outline
          </v-icon>
          查看範例
        </button>
      </div>

      <!-- Helpful Links -->
      <div class="error-links">
        <p class="error-links-title">您可能在尋找:</p>
        <div class="error-links-grid">
          <NuxtLink
            to="/showcase"
            class="error-link"
          >
            <v-icon
              size="16"
              class="mr-1"
            >
              mdi-view-dashboard
            </v-icon>
            功能展示
          </NuxtLink>
          <NuxtLink
            to="/showcase/development"
            class="error-link"
          >
            <v-icon
              size="16"
              class="mr-1"
            >
              mdi-book-open-page-variant
            </v-icon>
            開發指南
          </NuxtLink>
          <NuxtLink
            to="/showcase/api-demo"
            class="error-link"
          >
            <v-icon
              size="16"
              class="mr-1"
            >
              mdi-api
            </v-icon>
            API 管理
          </NuxtLink>
          <NuxtLink
            to="/showcase/component-showcase"
            class="error-link"
          >
            <v-icon
              size="16"
              class="mr-1"
            >
              mdi-puzzle-outline
            </v-icon>
            元件架構
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  background: #0f172a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', system-ui, sans-serif;
}

.error-bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 30% 20%, rgba(251, 146, 60, 0.08), transparent 40%),
    radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.08), transparent 40%);
  pointer-events: none;
  z-index: 1;
}

.error-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  width: 100%;
  text-align: center;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Error Icon */
.error-icon-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.error-icon-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(251, 146, 60, 0.3), transparent 70%);
  filter: blur(30px);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
}

.error-icon-container {
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(251, 146, 60, 0.3);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Error Code */
.error-code {
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #fb923c, #f97316);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.05em;
  text-shadow: 0 0 60px rgba(251, 146, 60, 0.3);
}

/* Error Title & Description */
.error-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #f1f5f9;
  letter-spacing: -0.02em;
}

.error-description {
  font-size: 1.125rem;
  color: #94a3b8;
  margin-bottom: 3rem;
  line-height: 1.6;
}

/* Action Buttons */
.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.error-btn {
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: none;
  outline: none;
}

.error-btn-primary {
  background: linear-gradient(135deg, #fb923c, #f97316);
  color: white;
  box-shadow: 0 4px 12px rgba(251, 146, 60, 0.3);
}

.error-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(251, 146, 60, 0.4);
}

.error-btn-secondary {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  backdrop-filter: blur(12px);
}

.error-btn-secondary:hover {
  background: rgba(30, 41, 59, 0.85);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Helpful Links */
.error-links {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.error-links-title {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.error-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
}

.error-link {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.error-link:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(251, 146, 60, 0.3);
  color: #fb923c;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 640px) {
  .error-code {
    font-size: 5rem;
  }

  .error-title {
    font-size: 2rem;
  }

  .error-description {
    font-size: 1rem;
  }

  .error-icon-container {
    width: 100px;
    height: 100px;
  }

  .error-actions {
    flex-direction: column;
    width: 100%;
  }

  .error-btn {
    width: 100%;
  }

  .error-links-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
