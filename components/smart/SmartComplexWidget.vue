<script setup lang="ts">
// 這個組件內部可以非常複雜，包含大量的狀態、計算、API 呼叫等
// 但對 Schema 來說，它只是一個 "標籤"

const count = ref(0)
const history = ref<string[]>([])

const increment = () => {
  count.value++
  history.value.unshift(
    `Count increased to ${count.value} at ${new Date().toLocaleTimeString()}`
  )
}

const reset = () => {
  count.value = 0
  history.value = []
}
</script>

<template>
  <v-card
    class="mx-auto"
    elevation="0"
    border
    rounded="xl"
    max-width="600"
    color="white"
  >
    <!-- Clean Header -->
    <div class="pa-6 pb-0 d-flex align-center justify-space-between">
      <div>
        <div class="text-overline text-grey-darken-1 mb-1 font-weight-bold">
          SMART WIDGET
        </div>
        <div class="text-h5 font-weight-bold text-grey-darken-4">
          複雜組件範例
        </div>
        <div class="text-body-2 text-grey-darken-1 mt-1">
          展示內部狀態管理與互動邏輯
        </div>
      </div>
      <v-avatar color="blue-lighten-5" size="48" rounded="lg">
        <v-icon
          icon="mdi-chart-timeline-variant"
          color="blue-darken-2"
          size="24"
        />
      </v-avatar>
    </div>

    <v-card-text class="pa-6">
      <!-- Main Content Card -->
      <v-sheet
        color="grey-lighten-4"
        rounded="xl"
        class="pa-6 mb-6 d-flex align-center justify-space-between"
      >
        <div>
          <div class="text-caption text-grey-darken-1 font-weight-bold mb-1">
            CURRENT VALUE
          </div>
          <div class="text-h2 font-weight-black text-blue-darken-3">
            {{ count }}
          </div>
        </div>

        <div class="d-flex flex-column gap-2">
          <v-btn
            color="blue-darken-2"
            variant="flat"
            height="44"
            prepend-icon="mdi-plus"
            class="text-none px-6"
            rounded="lg"
            elevation="2"
            @click="increment"
          >
            增加數值
          </v-btn>
          <v-btn
            variant="text"
            color="grey-darken-2"
            height="36"
            class="text-none"
            size="small"
            @click="reset"
          >
            重置狀態
          </v-btn>
        </div>
      </v-sheet>

      <!-- History Section -->
      <div class="mb-3 d-flex align-center">
        <span class="text-subtitle-2 font-weight-bold text-grey-darken-3"
          >操作紀錄</span
        >
        <v-chip
          size="x-small"
          color="blue-grey"
          variant="flat"
          class="ml-2 font-weight-bold"
        >
          {{ history.length }}
        </v-chip>
      </div>

      <div class="d-flex flex-column gap-2">
        <v-slide-y-transition group>
          <div
            v-for="log in history"
            :key="log"
            class="d-flex align-center py-3 px-4 border rounded-lg bg-white"
          >
            <div class="d-flex flex-column mr-3">
              <v-icon
                icon="mdi-circle-small"
                color="green-darken-1"
                size="small"
              />
            </div>
            <span class="text-body-2 text-grey-darken-3">{{ log }}</span>
          </div>
        </v-slide-y-transition>

        <div
          v-if="history.length === 0"
          class="text-center py-8 text-grey-lighten-1 border border-dashed rounded-lg"
        >
          <div class="text-body-2">尚無任何操作紀錄</div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
