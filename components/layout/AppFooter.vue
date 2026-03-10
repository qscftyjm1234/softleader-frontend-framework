<template>
  <footer
    v-if="appStore.config.footer.visible"
    class="bg-white border-t border-slate-100 py-12 px-8 mt-auto"
  >
    <div class="max-w-[1400px] mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs"
            >
              SL
            </div>
            <span class="font-black text-slate-900 tracking-tighter">SOFTLEADER</span>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed max-w-xs">
            專業級企業軟體解決方案，專注於提供卓越的使用者體驗與高效的開發流程。
          </p>
        </div>

        <div class="space-y-4">
          <h4 class="text-xs font-black text-slate-900 uppercase tracking-widest">產品服務</h4>
          <ul class="space-y-2 m-0 p-0 list-none text-sm text-slate-500">
            <li class="hover:text-blue-600 cursor-pointer transition-colors">元件庫 Showcase</li>
            <li class="hover:text-blue-600 cursor-pointer transition-colors">Vue 3 核心課程</li>
            <li class="hover:text-blue-600 cursor-pointer transition-colors">開發者文件</li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-xs font-black text-slate-900 uppercase tracking-widest">資源中心</h4>
          <ul class="space-y-2 m-0 p-0 list-none text-sm text-slate-500">
            <li class="hover:text-blue-600 cursor-pointer transition-colors">系統更新日誌</li>
            <li class="hover:text-blue-600 cursor-pointer transition-colors">社群討論區</li>
            <li class="hover:text-blue-600 cursor-pointer transition-colors">支援中心</li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-xs font-black text-slate-900 uppercase tracking-widest">聯繫我們</h4>
          <div class="flex gap-4">
            <div
              class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
            >
              <IIcon
                icon="mdi-github"
                size="18"
              />
            </div>
            <div
              class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
            >
              <IIcon
                icon="mdi-linkedin"
                size="18"
              />
            </div>
            <div
              class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
            >
              <IIcon
                icon="mdi-email-outline"
                size="18"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
          {{ appStore.config.footer.content }}
        </div>
        <div class="flex gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <span class="hover:text-slate-600 cursor-pointer">隱私權政策</span>
          <span class="hover:text-slate-600 cursor-pointer">服務條款</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
/**
 * 應用程式頁尾 - 框架無關
 * 框架無關的頁尾
 */
import { useAppStore } from '~/stores/app'
import IIcon from '~/components/uiInterface/IIcon.vue'

const appStore = useAppStore()
</script>
