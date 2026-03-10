<script setup lang="ts">
/**
 * 應用程式側邊欄 - 使用三層架構
 * 業務層：整合 Store、權限控制、導航邏輯
 * UI 層：使用 IDrawer + IMenuItem (可替換 UI 框架)
 */
import IDrawer from '~/components/uiInterface/layout/IDrawer.vue'
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
  <IDrawer
    v-model="drawer"
    permanent
    width="256px"
  >
    <!-- 品牌 Logo 區塊 -->
    <div
      class="h-16 flex items-center gap-3 px-6 border-b border-slate-100/50 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.01)] relative z-10 transition-colors"
    >
      <div
        class="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20"
      >
        <img
          v-if="appStore.config.branding.logo.image"
          :src="appStore.config.branding.logo.image"
          alt="Logo"
          class="w-full h-full object-contain"
        />
        <svg
          v-else
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="text-white"
        >
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <h1 class="text-[0.95rem] font-bold text-slate-800 truncate tracking-tight">
          {{ appStore.config.branding.title }}
        </h1>
        <p
          v-if="appStore.config.branding.subtitle"
          class="text-[10px] uppercase font-black tracking-widest text-slate-400 truncate mt-0.5"
        >
          {{ appStore.config.branding.subtitle }}
        </p>
      </div>
    </div>

    <!-- 導航選單 -->
    <nav class="p-4 bg-slate-50/30 flex-1 overflow-y-auto">
      <div
        v-if="appStore.config.sidebar.mainMenuTitle"
        class="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400"
      >
        {{ appStore.config.sidebar.mainMenuTitle }}
      </div>
      <div class="space-y-1">
        <AppSidebarItem
          v-for="item in sidebarStore.items"
          :key="item.label"
          :item="item"
        />
      </div>
    </nav>
  </IDrawer>
</template>

<style scoped>
/* Scoped 樣式已替換為 Tailwind CSS */
/* 我們保持 IDrawer 的內部樣式不變，儘可能透過 Class 在視覺上進行覆寫。 */
</style>
