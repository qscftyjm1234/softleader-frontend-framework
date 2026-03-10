<script setup lang="ts">
/**
 * ShowcaseCodeBlock
 * 業務邏輯層元件 (Business Layer)
 * 專用於展示程式碼區塊，包含複製功能與 Mac 風格視窗
 */
import { ref } from 'vue'
import IIcon from '@/components/uiInterface/IIcon.vue'

interface Props {
  code: string
  language?: string
  label?: string
  filename?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'html',
  label: '',
  filename: ''
})

const copied = ref(false)

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('複製失敗:', err)
  }
}
</script>

<template>
  <div
    class="bg-slate-900 rounded-2xl overflow-hidden shadow-lg shadow-slate-900/10 border border-slate-800 mt-4 group"
  >
    <!-- Window Header -->
    <div
      class="flex items-center justify-between px-4 py-2.5 bg-slate-800/90 border-b border-white/5"
    >
      <div class="flex items-center gap-4">
        <!-- Mac-style controls -->
        <div class="flex gap-1.5">
          <div class="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10"></div>
          <div class="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10"></div>
          <div class="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10"></div>
        </div>
        <!-- File Name / Label -->
        <div
          class="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"
        >
          <IIcon
            icon="mdi-xml"
            size="14"
            class="text-indigo-400"
          />
          <span
            v-if="filename"
            class="text-slate-300 font-mono italic normal-case tracking-normal"
          >
            {{ filename }}
          </span>
          <span v-else>{{ label || language }}</span>
        </div>
      </div>

      <div>
        <button
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
          :class="
            copied
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
          "
          @click="copyCode"
        >
          <IIcon
            :icon="copied ? 'mdi-check' : 'mdi-content-copy'"
            :size="12"
          />
          <span>{{ copied ? '已複製' : '複製' }}</span>
        </button>
      </div>
    </div>

    <!-- Code Content -->
    <div class="p-5 overflow-x-auto bg-[#0d1117]">
      <pre
        class="m-0 font-mono text-sm leading-relaxed text-slate-300 highlight-code"
      ><code><slot>{{ code }}</slot></code></pre>
    </div>
  </div>
</template>

<style scoped>
.highlight-code {
  tab-size: 2;
  white-space: pre;
}

/* Simulated Syntax Highlighting */
:deep(.hljs-keyword),
:deep(.kwd) {
  color: #c678dd;
} /* const, export, return */
:deep(.hljs-string),
:deep(.str) {
  color: #98c379;
} /* 'string' */
:deep(.hljs-attr),
:deep(.atn) {
  color: #d19a66;
} /* attr="val" */
:deep(.hljs-tag),
:deep(.tag) {
  color: #e06c75;
} /* <tag> */
:deep(.hljs-params),
:deep(.typ) {
  color: #e5c07b;
} /* (params) */
:deep(.hljs-comment),
:deep(.com) {
  color: #5c6370;
  italic: true;
}
:deep(.hljs-title),
:deep(.fun) {
  color: #61afef;
} /* function name */

/* Scrollbar refinement for code blocks */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.1);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.2);
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>
