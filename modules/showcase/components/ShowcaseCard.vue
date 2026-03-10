<script setup lang="ts">
import ICard from '@/components/uiInterface/ICard.vue'

interface Props {
  title?: string
  description?: string
  noPadding?: boolean
  compact?: boolean
}

defineProps<Props>()
</script>

<template>
  <ICard
    class="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-visible relative z-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-100 group"
    :class="{ 'p-0': noPadding }"
  >
    <!-- Highlight Ambient Glow -->
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
    ></div>

    <div
      v-if="title || $slots.header"
      class="relative z-10 border-b border-slate-100/60 flex flex-col justify-center items-start gap-2"
      :class="compact ? 'px-4 pt-4 pb-2' : 'px-6 pt-6 pb-4'"
    >
      <div
        v-if="title"
        class="flex-1 w-full"
      >
        <h3
          class="m-0 text-lg font-black text-slate-800 leading-tight tracking-tight flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-300"
          :class="{ 'text-base': compact }"
        >
          {{ title }}
        </h3>
        <p
          v-if="description"
          class="mt-2 mb-0 text-sm text-slate-500 leading-relaxed font-normal"
          :class="{ 'text-xs': compact }"
        >
          {{ description }}
        </p>
      </div>
      <div
        v-if="$slots.header"
        class="w-full"
      >
        <slot name="header" />
      </div>
    </div>

    <div
      class="relative z-10 bg-slate-50/50"
      :class="[
        noPadding ? 'p-0' : '',
        !noPadding && compact ? 'p-4' : '',
        !noPadding && !compact ? 'p-6' : ''
      ]"
    >
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="relative z-10 px-6 py-4 bg-slate-50/80 border-t border-slate-100/60 rounded-b-2xl"
    >
      <slot name="footer" />
    </div>
  </ICard>
</template>

<style scoped>
/* Typography Reset */
:deep(p) {
  margin-bottom: 1rem;
  line-height: 1.6;
}

:deep(p:last-child) {
  margin-bottom: 0;
}

/* Scrollbar refinement for any internal overflow */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.2);
  border-radius: 3px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>
