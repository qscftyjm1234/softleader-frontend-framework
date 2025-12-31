import type { Component } from 'vue'

// Import components to be registered
// In a real app, these might be dynamically imported or auto-imported
// For now, we'll assume they are globally available or imported here

/**
 * Registry mapping string keys to Vue components.
 */
import SmartTable from '~/components/uiBusiness/SmartTable.vue'
import SmartCard from '~/components/uiBusiness/SmartCard.vue'
import SmartComplexWidget from '~/components/uiBusiness/SmartComplexWidget.vue'
import LoginForm from '~/components/auth/LoginForm.vue'

const registry: Record<string, Component | string> = {
  // HTML elements
  div: 'div',
  span: 'span',
  h1: 'h1',
  h2: 'h2',
  p: 'p',
  button: 'button',

  // Layout Components (Vuetify)
  'v-row': 'v-row',
  'v-col': 'v-col',
  'v-container': 'v-container',
  'v-spacer': 'v-spacer',

  // Smart Components
  SmartTable: SmartTable,
  SmartCard: SmartCard,
  SmartComplexWidget: SmartComplexWidget,
  LoginForm: LoginForm
}

/**
 * Register a component globally for the schema system.
 * @param name
 * @param component
 */
export function registerComponent(name: string, component: Component | string) {
  registry[name] = component
}

/**
 * Get a component by name.
 * @param name
 */
export function getComponent(name: string): Component | string {
  return registry[name] || 'div' // Fallback to div if not found
}

export default registry
