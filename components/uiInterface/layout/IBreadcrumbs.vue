<script setup lang="ts">
/**
 * IBreadcrumbs - UI 介面層麵包屑
 *
 * 用途：統一的 Breadcrumbs 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface BreadcrumbItem {
  label: string
  to?: string
  disabled?: boolean
}

interface Props {
  items: BreadcrumbItem[]
}

// props 已定義，但目前在模板中未使用，因為 SVG 是硬編碼的。
// items prop 是導覽項目所必需的。
defineProps<Props>()
</script>

<template>
  <nav
    class="flex items-center"
    aria-label="Breadcrumb"
  >
    <ol class="flex items-center space-x-2">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center"
      >
        <div class="flex items-center">
          <!-- 分隔線圖示 -->
          <svg
            v-if="index > 0"
            class="h-5 w-5 flex-shrink-0 text-slate-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
          </svg>

          <NuxtLink
            v-if="item.to && index < items.length - 1"
            :to="item.to"
            class="ml-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
          <span
            v-else
            class="ml-2 text-xs font-black text-slate-900"
            :class="{ 'opacity-50': item.disabled }"
            aria-current="page"
          >
            {{ item.label }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
/* 為了保持一致性，移除 Scoped 樣式，改用 Tailwind Class */
</style>
