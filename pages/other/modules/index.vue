<script setup lang="ts">
/**
 * @功能 提供偵測當前裝置(手機、平板、桌機)
 */
const device = useDevice()
/**
 * @功能 使用i18n語系
 */
const { locale } = useI18n()

const switchLocale = (code) => {
  locale.value = code
}

/**
 * @功能 使用usevue
 */

const { x, y } = useMouse()
</script>
<template>
  <h1>Nuxt3官方或社群套件，透過config modules 已掛載至vue時體內</h1>
  <v-card
    class="pa-2 mb-4"
    title="使用nuxt3提供之模組，判斷目前裝置"
  >
    <div>裝置類型：{{ device.userAgent }}</div>
    <div>手機？ {{ device.isMobile ? '是' : '否' }}</div>
    <div>平板？ {{ device.isTablet ? '是' : '否' }}</div>
    <div>桌機？ {{ device.isDesktop ? '是' : '否' }}</div>
  </v-card>
  <v-card
    class="pa-2 mb-4"
    title="使用i18n語系，nuxt3整合之套件"
  >
    <p>
      <v-btn
        color="primary"
        class="mr-2"
        @click="switchLocale('en')"
      >
        English
      </v-btn>
      <v-btn
        color="green"
        @click="switchLocale('zh')"
      >
        中文
      </v-btn>
      切換語系文字：{{ $t('hello') }} {{ $t('companyName') }}
    </p>
  </v-card>

  <v-card
    class="pa-2 mb-4"
    title="使用vueuse，有很多好用功能"
  >
    {{ useOnline() }}
    視窗大小（寬高）: {{ useWindowSize() }} 滑鼠位置:
    <p>滑鼠位置：X={{ x }}, Y={{ y }}</p>
    即時時間：{{ useNow() }}
  </v-card>
</template>
