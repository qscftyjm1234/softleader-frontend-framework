<script setup lang="ts">
import { computed } from 'vue'
import type { SchemaNode } from '~/core/schema/types'
import { getComponent } from '~/core/schema/registry'

const props = defineProps<{
  schema: SchemaNode
}>()

const resolvedComponent = computed(() => {
  const component = getComponent(props.schema.type)

  if (typeof component === 'string') {
    // If it's a string (e.g. 'div', 'h1'), return it directly
    return component
  }

  // If it's a Vue component object, return it
  return component
})
</script>

<template>
  <component
    :is="resolvedComponent"
    v-bind="props.schema.props"
    :key="props.schema.id"
  >
    <!-- 1. Render text content if 'textContent' or 'text' prop exists (for simple elements like button, p, h1) -->
    <template v-if="props.schema.props?.textContent || props.schema.props?.text">
      {{ props.schema.props.textContent || props.schema.props.text }}
    </template>

    <!-- 2. Recursively render children -->
    <template v-if="props.schema.children && props.schema.children.length">
      <SchemaRenderer
        v-for="(child, index) in props.schema.children"
        :key="child.id || index"
        :schema="child"
      />
    </template>
  </component>
</template>
