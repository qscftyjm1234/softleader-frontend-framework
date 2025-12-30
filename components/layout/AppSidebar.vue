<script setup lang="ts">
/**
 * App Sidebar - Framework Agnostic
 * 框架無關的側邊欄
 */
import AppSidebarItem from '~/components/layout/AppSidebarItem.vue'

const sidebarStore = useSidebarStore()
const userStore = useUserStore()
const appStore = useAppStore()

const props = defineProps<{
  modelValue?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const drawer = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 確保 sidebar 已經生成,並傳入使用者權限
watch(
  () => userStore.permissions,
  (newPermissions) => {
    sidebarStore.generate(newPermissions)
  },
  { immediate: true }
)
</script>

<template>
  <aside
    class="app-sidebar"
    :class="{ 'is-open': drawer }"
  >
    <!-- 品牌 Logo 區塊 -->
    <div class="sidebar-brand">
      <div class="sidebar-brand-icon">
        <img
          v-if="appStore.config.branding.logo.image"
          :src="appStore.config.branding.logo.image"
          alt="Logo"
          style="width: 100%; height: 100%; object-fit: contain"
        />
        <svg
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      </div>
      <div class="sidebar-brand-text">
        <h1 class="sidebar-brand-title">
          {{ appStore.config.branding.title }}
        </h1>
        <p class="sidebar-brand-subtitle">
          {{ appStore.config.branding.subtitle }}
        </p>
      </div>
    </div>

    <!-- 導航選單 -->
    <nav class="sidebar-nav">
      <div class="sidebar-nav-title">
        {{ appStore.config.sidebar.mainMenuTitle }}
      </div>
      <AppSidebarItem
        v-for="item in sidebarStore.items"
        :key="item.label"
        :item="item"
      />
    </nav>
  </aside>
</template>
