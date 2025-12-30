<script setup lang="ts">
/**
 * Header User Menu - Framework Agnostic
 * 框架無關的使用者選單
 */
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
const isOpen = ref(false)

const handleAction = async (item: any) => {
  isOpen.value = false

  if (item.to) {
    navigateTo(item.to)
  } else if (item.action) {
    console.log('Triggered action:', item.action)
    if (item.action === 'logout') {
      const { $api } = useNuxtApp()

      try {
        // 1. 呼叫登出 API
        await $api.auth.logout()
      } catch (e) {
        console.error('Logout failed', e)
      } finally {
        // 2. 清除 Cookie
        const config = useRuntimeConfig()
        const token = useCookie(config.public.tokenKey as string)
        token.value = null

        // 3. 導回登入頁
        navigateTo('/login')
      }
    }
  }
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

// 點擊外部關閉
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.dropdown')) {
      isOpen.value = false
    }
  })
})
</script>

<template>
  <div
    v-if="appStore.config.header.userMenu.visible"
    class="dropdown"
    :class="{ 'is-open': isOpen }"
  >
    <button
      class="dropdown-toggle btn-icon"
      @click.stop="toggleMenu"
    >
      <img
        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
        alt="User avatar"
        style="width: 36px; height: 36px; border-radius: var(--radius-full); object-fit: cover"
      />
    </button>

    <div class="dropdown-menu">
      <!-- User Info -->
      <div
        style="
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border-bottom: 1px solid var(--color-gray-200);
        "
      >
        <img
          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
          alt="User avatar"
          style="width: 40px; height: 40px; border-radius: var(--radius-full); object-fit: cover"
        />
        <div>
          <div style="font-weight: 600; font-size: 0.875rem">Admin User</div>
          <div style="font-size: 0.75rem; color: var(--color-gray-600)">admin@example.com</div>
        </div>
      </div>

      <!-- Menu Items -->
      <div style="padding: 0.5rem 0">
        <template
          v-for="(item, i) in appStore.config.header.userMenu.items"
          :key="i"
        >
          <div
            v-if="item.divider"
            class="dropdown-menu-divider"
          />
          <a
            v-else
            href="#"
            class="dropdown-menu-item"
            :style="{ color: item.color === 'error' ? 'var(--color-error)' : 'inherit' }"
            @click.prevent="handleAction(item)"
          >
            <svg
              v-if="item.icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              style="margin-right: 0.75rem"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
              />
            </svg>
            {{ item.title }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
