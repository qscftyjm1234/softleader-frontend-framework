<script setup lang="ts">
/**
 * 應用程式側邊欄項目 - 框架無關
 * 框架無關的側邊欄項目 (支援遞迴巢狀選單)
 */
import type { SidebarItem } from '~/core/sidebar/buildSidebar'
import AppSidebarItem from '~/components/layout/AppSidebarItem.vue'
import IIcon from '~/components/uiInterface/IIcon.vue'

defineOptions({
  name: 'AppSidebarItem'
})

const props = defineProps<{
  item: SidebarItem
}>()

const route = useRoute()
const isExpanded = ref(false)

// 判斷是否為目前活動項目
const isActive = computed(() => {
  if (!props.item.to) return false
  return route.path === props.item.to
})

// 如果有子選單,切換展開狀態
const toggleExpand = () => {
  if (props.item.children && props.item.children.length > 0) {
    isExpanded.value = !isExpanded.value
  }
}

// 處理點擊事件
const handleClick = () => {
  if (props.item.to) {
    navigateTo(props.item.to)
  } else {
    toggleExpand()
  }
}
</script>

<template>
  <!-- 如果有子選單 -->
  <div v-if="item.children && item.children.length > 0">
    <div
      class="group flex items-center px-4 py-2.5 my-0.5 rounded-xl cursor-pointer transition-all duration-300"
      :class="[
        item.disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-white hover:shadow-sm hover:shadow-slate-200/50 text-slate-600 hover:text-slate-900',
        isExpanded
          ? 'bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] text-slate-900 font-semibold'
          : ''
      ]"
      @click="handleClick"
    >
      <div
        v-if="item.icon"
        class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors duration-300"
        :class="
          isExpanded
            ? 'bg-blue-50 text-blue-500'
            : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50/50 group-hover:text-blue-400'
        "
      >
        <IIcon
          :icon="item.icon"
          size="18"
        />
      </div>
      <div
        v-else
        class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-slate-50 text-slate-400"
      >
        <div class="w-1.5 h-1.5 rounded-full bg-current opacity-50"></div>
      </div>

      <span class="flex-1 text-sm tracking-wide">{{ item.label }}</span>

      <IIcon
        icon="mdi-chevron-down"
        size="18"
        class="text-slate-400 transition-transform duration-300"
        :class="isExpanded ? 'rotate-180 text-blue-500' : 'rotate-0 group-hover:text-slate-600'"
      />
    </div>

    <!-- 子選單 (遞迴) -->
    <div
      v-show="isExpanded"
      class="pl-4 mt-1 space-y-1 relative before:content-[''] before:absolute before:left-8 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 before:rounded-full"
    >
      <AppSidebarItem
        v-for="child in item.children"
        :key="child.label"
        :item="child"
      />
    </div>
  </div>

  <!-- 如果沒有子選單 -->
  <NuxtLink
    v-else
    :to="item.to || '#'"
    class="group flex items-center px-4 py-2.5 my-0.5 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden"
    :class="[
      item.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
      isActive
        ? 'bg-gradient-to-r from-emerald-500/10 to-transparent text-emerald-700 font-bold shadow-[inset_2px_0_0_rgb(16,185,129)]'
        : 'text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm hover:shadow-slate-200/50'
    ]"
    @click.prevent="handleClick"
  >
    <div
      v-if="item.icon"
      class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors duration-300"
      :class="
        isActive
          ? 'bg-emerald-100 text-emerald-600'
          : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-50/50 group-hover:text-emerald-500'
      "
    >
      <IIcon
        :icon="item.icon"
        size="18"
      />
    </div>
    <div
      v-else
      class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors"
      :class="isActive ? 'text-emerald-500' : 'text-slate-400'"
    >
      <div
        class="w-1.5 h-1.5 rounded-full bg-current"
        :class="isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'"
      ></div>
    </div>

    <span class="flex-1 text-sm tracking-wide">{{ item.label }}</span>

    <!-- Active Indicator Dot -->
    <div
      v-if="isActive"
      class="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-2 animate-pulse"
    ></div>
  </NuxtLink>
</template>

<style scoped>
/* Scoped styles replaced by Tailwind CSS */
</style>
