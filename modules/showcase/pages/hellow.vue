<template>
  <div class="p-10 bg-slate-50 min-h-screen">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- 組件式跳轉 -->
      <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
        <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
          點擊下方按鈕回首頁
        </h3>
        <NuxtLink to="/">
          <IButton
            variant="primary"
            class="px-10"
          >
            回到系統大廳
          </IButton>
        </NuxtLink>
      </div>

      <!-- 腳本式跳轉 -->
      <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
        <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
          使用程式碼邏輯跳轉
        </h3>
        <button
          class="px-8 py-3 bg-slate-50 border border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all font-bold"
          @click="goBack"
        >
          模擬上一頁動作
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

/**
 *
 */
function goBack() {
  // 透過程式碼控制路由跳轉
  router.back()
}

definePageMeta({
  title: '路由導航指南',
  layout: 'portal'
})
</script>
