<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()

const userId = route.params.id

const router = useRouter()

function goToRouter() {
  router.push('/router')
}

function goToParamRouter() {
  router.push('/router/1')
}

function goBack() {
  router.back()
}
</script>
<template>
  <h1><slot /></h1>

  <v-btn class="ma-2" @click="goToRouter()"> 前往/router </v-btn>

  <v-btn class="ma-2" @click="goToParamRouter()"> 前往動態param參數路由 </v-btn>
  <v-btn class="ma-2" @click="goBack()"> 回上一頁 </v-btn>
  <br />
  <template v-if="userId">
    <v-card class="ma-2 pa-2">
      {{ `抓取url parmas id：${userId}` }}
    </v-card>
  </template>

  <v-card class="ma-2 pa-2"> path: {{ route.path }} </v-card>
  <v-card class="ma-2 pa-2"> fullPath : {{ route.fullPath }} </v-card>

  <textarea id="codeInput" spellcheck="false">
		// 在這裡輸入你的程式碼
		pages/
		├── index.vue          // 對應路由 '/'
		├── about.vue          // 對應路由 '/about'
		├── router/index.vue   // 對應路由 '/router'
		├── router/[id].vue   // 對應路由 '/router/:id'

		// 🚀 獲取path靜態資料
		import { useRoute } from 'vue-router'
		const route = useRoute()

		// 獲取url動態參數
		const userId = route.params.id // 1

		// 獲取query參數
		http://localhost:3000/router/123?tab=posts&page=2
		const query = route.query // { tab: 'posts', page: '2' }

		// 獲取url path
		const path = route.path // /router/1

		// 獲取url fullPath
		const fullPath = route.fullPath // "/router/1?tab=posts#section1" => 包含hash and query

		// 🚀 Router => 控制動態操作
		import { useRouter } from 'vue-router'
		const router = useRouter()
		// 使用路徑
		router.push('/router')

		// 使用命名路由
		router.push('/router/1')

		// 返回上一頁
		router.back()
	</textarea
  >
</template>
