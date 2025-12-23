<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  text?: string
  icon?: string
  color?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  text: '',
  icon: 'mdi-information',
  color: 'primary'
})
</script>

<template>
  <v-card class="mx-auto" :color="color" variant="tonal">
    <template #prepend>
      <v-icon :icon="icon" />
    </template>
    <v-card-title v-if="title">
      {{ title }}
    </v-card-title>
    <v-card-subtitle v-if="subtitle">
      {{ subtitle }}
    </v-card-subtitle>
    <v-card-text v-if="text">
      {{ text }}
    </v-card-text>

    <!-- 支援 Children 渲染 -->
    <div v-if="$slots.default" class="px-4 pb-4">
      <slot />
    </div>
  </v-card>
</template>
