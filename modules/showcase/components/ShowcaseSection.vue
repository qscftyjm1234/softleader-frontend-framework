<script setup lang="ts">
/**
 * ShowcaseSection
 * 業務邏輯層元件 (Business Layer)
 * 使用 ICard 封裝展示區塊
 */

interface Props {
  title?: string
  icon?: string
}

defineProps<Props>()
</script>

<template>
  <div class="mb-20 relative">
    <div class="mb-8 relative">
      <h2 class="text-3xl font-black text-slate-800 tracking-tight mb-3 flex items-center gap-4">
        <IIcon
          v-if="icon"
          :icon="icon"
          class="text-blue-500 text-4xl"
        />
        <span>{{ title }}</span>
      </h2>
      <div class="h-px bg-gradient-to-r from-blue-500 to-transparent w-full max-w-[300px] relative">
        <div class="absolute -top-px left-0 w-8 h-[3px] bg-blue-500 rounded-sm"></div>
      </div>
    </div>
    <div class="w-full flex flex-col gap-8">
      <slot />
    </div>
  </div>
</template>
