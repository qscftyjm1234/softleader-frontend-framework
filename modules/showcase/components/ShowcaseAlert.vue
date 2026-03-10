<script setup lang="ts">
/**
 * ShowcaseAlert
 * 業務邏輯層元件 (Business Layer)
 * 封裝 IAlert 用於特定展示用途
 */

interface Props {
  title?: string
  type?: 'info' | 'success' | 'warning' | 'error'
}

withDefaults(defineProps<Props>(), {
  title: '',
  type: 'info'
})
</script>

<template>
  <div
    class="flex gap-4 p-6 rounded-2xl mb-6 backdrop-blur-md border border-slate-200/60 shadow-sm transition-all duration-300"
    :class="{
      'bg-blue-50/50 border-l-4 border-l-blue-500': type === 'info',
      'bg-emerald-50/50 border-l-4 border-l-emerald-500': type === 'success',
      'bg-amber-50/50 border-l-4 border-l-amber-500': type === 'warning',
      'bg-red-50/50 border-l-4 border-l-red-500': type === 'error'
    }"
  >
    <div class="text-2xl leading-none pt-1">
      <template v-if="type === 'info'">ℹ️</template>
      <template v-else-if="type === 'success'">✅</template>
      <template v-else-if="type === 'warning'">⚠️</template>
      <template v-else-if="type === 'error'">❌</template>
    </div>
    <div class="flex-1">
      <h4
        v-if="title"
        class="m-0 mb-2 text-base font-semibold text-slate-800"
      >
        {{ title }}
      </h4>
      <div
        class="text-[0.95rem] leading-relaxed text-slate-600 font-normal [&_ul]:m-0 [&_ul]:pl-5 [&_li]:mb-1"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
