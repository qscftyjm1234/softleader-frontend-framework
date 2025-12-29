<script setup lang="ts">
// @ts-nocheck
const { data: statsData, pending: statsPending } = useRepository().dashboard.getStats()
await waitForData(statsPending)
// console.log('統計:', statsData.value)

const { data: activitiesData, pending: activitiesPending } =
  useRepository().dashboard.getActivities({
    limit: 10
  })

await waitForData(activitiesPending)
// console.log('活動:', activitiesData.value)
import HeaderLanguage from '~/components/layout/header/HeaderLanguage.vue'

const device = useAppDevice()

const abcb = ref<any>(1)
const abc = ref<number>(1)
abc.value = '2'
</script>

<template>
  <v-container fluid>
    <!-- Debug Platform -->
    <v-alert
      type="info"
      variant="tonal"
      class="mb-4"
    >
      <pre>{{ device }}</pre>
    </v-alert>

    <!-- 歡迎標題 -->
    <div class="d-flex align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">{{ $t('dashboard.title') }}</h1>
        <p class="text-subtitle-1 text-medium-emphasis">{{ $t('dashboard.welcomeMessage') }}</p>
      </div>
      <v-spacer />

      <HeaderLanguage />

      <v-btn
        color="primary"
        prepend-icon="mdi-download"
      >
        {{ $t('dashboard.exportReport') }}
      </v-btn>
    </div>

    <!-- 統計卡片 -->
    <v-row>
      <template v-if="statsPending">
        <v-col
          v-for="i in 4"
          :key="`skeleton-${i}`"
          cols="12"
          sm="6"
          md="3"
        >
          <v-skeleton-loader type="card" />
        </v-col>
      </template>
      <template v-else>
        <v-col
          v-for="(stat, i) in statsData"
          :key="i"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card
            elevation="2"
            class="rounded-lg"
          >
            <v-card-text class="d-flex align-center">
              <v-avatar
                :color="stat.color"
                variant="tonal"
                size="48"
                class="me-4"
              >
                <v-icon
                  :icon="stat.icon"
                  size="24"
                />
              </v-avatar>
              <div>
                <div class="text-caption text-medium-emphasis">
                  {{ stat.title }}
                </div>
                <div class="text-h5 font-weight-bold">{{ stat.value }}</div>
              </div>
              <v-spacer />
              <v-chip
                :color="
                  stat.trend.includes('+')
                    ? 'success'
                    : stat.trend.includes('-')
                      ? 'error'
                      : 'default'
                "
                size="x-small"
                label
              >
                {{ stat.trend }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>

    <v-row class="mt-4">
      <!-- 系統公告 / 趨勢圖 (模擬) -->
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          class="h-100 rounded-lg"
          elevation="2"
        >
          <v-card-title class="d-flex align-center">
            <v-icon
              icon="mdi-chart-line"
              start
              color="primary"
            />
            {{ $t('dashboard.trafficTrend') }}
            <v-spacer />
            <v-btn-toggle
              density="compact"
              color="primary"
              variant="outlined"
              mandatory
            >
              <v-btn size="small">{{ $t('common.week') }}</v-btn>
              <v-btn size="small">{{ $t('common.month') }}</v-btn>
              <v-btn size="small">{{ $t('common.year') }}</v-btn>
            </v-btn-toggle>
          </v-card-title>
          <v-card-text
            class="d-flex align-center justify-center"
            style="height: 300px"
          >
            <div class="text-center text-medium-emphasis">
              <v-icon
                icon="mdi-chart-bar"
                size="64"
                class="mb-2 opacity-50"
              />
              <p>{{ $t('dashboard.chartPlaceholder') }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 近期活動 -->
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          class="h-100 rounded-lg"
          elevation="2"
        >
          <v-card-title>{{ $t('dashboard.recentActivities') }}</v-card-title>
          <v-list
            v-if="activitiesPending"
            lines="two"
          >
            <v-skeleton-loader
              v-for="i in 4"
              :key="`activity-skeleton-${i}`"
              type="list-item-avatar-two-line"
            />
          </v-list>
          <v-list
            v-else
            lines="two"
          >
            <v-list-item
              v-for="(activity, i) in activitiesData"
              :key="i"
              :subtitle="activity.time"
            >
              <template #prepend>
                <v-avatar
                  :color="activity.color"
                  size="small"
                  variant="flat"
                  class="me-1"
                >
                  <v-icon
                    :icon="activity.icon"
                    size="small"
                    color="white"
                  />
                </v-avatar>
              </template>
              <v-list-item-title class="text-body-2">
                <span class="font-weight-bold">{{ activity.user }}</span>
                {{ activity.action }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn
              block
              variant="text"
              color="primary"
            >
              {{ $t('common.viewMore') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
