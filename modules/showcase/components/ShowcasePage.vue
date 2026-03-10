<script setup lang="ts">
/**
 * ShowcasePage
 * 業務邏輯層元件 (Business Layer)
 * 頁面標準佈局 - Dark Mode / Glassmorphism Style
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  title: string
  description?: string
  backTo?: string
  backText?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  backTo: '/',
  backText: '返回首頁'
})

const route = useRoute()

// 自動生成麵包屑
const breadcrumbs = computed(() => {
  const parts = route.path.split('/').filter((p) => p)

  const items = parts.map((part, index) => {
    const isLast = index === parts.length - 1
    const path = `/${parts.slice(0, index + 1).join('/')}`

    // 簡單的標題映射 (可擴充)
    let title = part.charAt(0).toUpperCase() + part.slice(1)
    if (part === 'showcase') title = '模組'

    // 如果是當前頁面，使用 props title
    if (isLast && props.title) {
      // 嘗試移除括號內的英文，只保留中文 (如果有)
      const match = props.title.match(/(.*)\s\(/)
      title = match ? match[1] : props.title
    }

    return {
      title,
      path,
      disabled: isLast
    }
  })

  // 確保首頁在最前
  return [{ title: '首頁', path: '/', disabled: false }, ...items]
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 relative font-sans text-slate-800">
    <!-- Background Decoration -->
    <div
      class="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none z-0"
    ></div>
    <div
      class="absolute top-40 left-10 w-64 h-64 bg-emerald-50/40 rounded-full blur-3xl pointer-events-none z-0"
    ></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-12">
      <!-- Header Section -->
      <!-- Top Navigation Bar (Home + Breadcrumbs) -->
      <header class="mb-10 border-b border-slate-200/50 pb-6">
        <div class="flex items-center gap-5">
          <NuxtLink
            to="/"
            class="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all hover:shadow-sm group/home"
            title="回到首頁"
          >
            <IIcon
              icon="mdi-home-outline"
              size="22"
              class="group-hover/home:scale-110 transition-transform"
            />
          </NuxtLink>

          <div class="h-6 w-px bg-slate-200"></div>

          <div class="flex-1">
            <nav aria-label="Breadcrumb">
              <ol class="flex items-center gap-2">
                <li
                  v-for="(item, index) in breadcrumbs"
                  :key="item.path"
                  class="flex items-center"
                >
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
                    v-if="!item.disabled"
                    :to="item.path"
                    class="ml-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {{ item.title }}
                  </NuxtLink>
                  <span
                    v-else
                    class="ml-2 text-[11px] font-black uppercase tracking-widest text-slate-900"
                    aria-current="page"
                  >
                    {{ item.title }}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </header>

      <!-- Main Content Header (Title & Description) - Independent Section -->
      <section class="mb-12">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div class="flex-1">
            <h1 class="text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
              {{ title }}
            </h1>
            <p
              v-if="description"
              class="text-lg text-slate-500 font-medium leading-relaxed max-w-3xl"
            >
              {{ description }}
            </p>
          </div>

          <div class="flex items-center gap-4 pb-2">
            <slot name="header-extra" />
            <NuxtLink
              v-slot="{ navigate }"
              :to="backTo"
              custom
            >
              <button
                class="group flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-slate-100 text-slate-600 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                @click="navigate"
              >
                <IIcon
                  icon="mdi-arrow-left"
                  size="18"
                  class="text-slate-400 group-hover:text-blue-500 transition-all"
                />
                <span class="text-sm font-bold">{{ backText }}</span>
              </button>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <main class="flex flex-col gap-8">
        <slot />
      </main>
    </div>
  </div>
</template>
