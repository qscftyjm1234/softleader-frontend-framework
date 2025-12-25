<template>
  <v-card
    class="pa-2 mb-4"
    title="數字變整數："
  >
    <textarea
      id="codeInput"
      spellcheck="false"
    >
        toInteger('1.52') // 1
    </textarea>
    {{ toInteger('1.52') }}
  </v-card>
  <v-card
    class="pa-2 mb-4"
    title="字串轉為Json："
  >
    <textarea
      id="codeInput"
      spellcheck="false"
    >
        stringToJson(true) // 'true'
    </textarea>
    {{ stringToJson(true) }}
  </v-card>
</template>
