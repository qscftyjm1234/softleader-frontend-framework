<script setup>
/** 全域函數的註冊 */
const { $hellow, $axios } = useNuxtApp()

/** 將自定義註冊的方法，注入在全域 */
const globalPlugins = $hellow

/** 將第三方套件註冊到全域，無須import等動作，可直接使用 */
const dayPlugins = dayjs().format('YYYY年MM月DD日')

/** 將第三方套件注入到全域，須呼叫useNuxtApp() */
const getJsons = ref(null)
const fetchData = async () => {
  try {
    const response = await $axios.get(
      'https://jsonplaceholder.typicode.com/todos/1'
    )
    getJsons.value = response.data
  } catch (error) {
    console.error(error)
  }
}

fetchData()
</script>
<template>
  <v-card class="pa-2 mb-4" title="將自定義註冊的方法，注入在全域">
    <p>globalPlugins：{{ globalPlugins('全球人壽') }}</p>
  </v-card>

  <v-card
    class="pa-2 mb-4"
    title="將第三方套件註冊到全域，無須import等動作，可直接使用"
  >
    <p>dayPlugins：{{ dayPlugins }}</p>
  </v-card>

  <v-card class="pa-2 mb-4" title="將第三方套件注入到全域，須呼叫useNuxtApp()">
    <p>getJsons：{{ getJsons }}</p>
  </v-card>

  <v-card class="pa-2 mb-4" title="將Ui framework 引入專案中">
    <v-btn color="primary">Hello 全球人壽</v-btn>
  </v-card>
</template>
