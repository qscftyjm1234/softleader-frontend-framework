/**
 * @目的　Ui套件初始化(以Vuetify為例)
 * @指令 `pnpm add vuetify`
 * @名詞 `defineNuxtPlugin`：註冊 plugin 的方法
 */

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  // 建立 Vuetify 實例，也就是「把你要用的元件跟指令裝進 Vuetify 裡
  const vuetify = createVuetify({
    components, // vuefity提供組件，為了方便故，全部引入。

    // 也可以挑選您需要的組件引入
    // components: {
    //   VBtn,
    //   VCard
    // }

    directives, // vuefitu\y附加互動效果
    // ex. <v-btn v-ripple>按我</v-btn>

    defaults: {
      VCard: {
        elevation: 2
      }
    }
  })

  // 最後再將Vuetify 實例，安裝到Vue app中，故此都無須再import!
  nuxtApp.vueApp.use(vuetify)
})
