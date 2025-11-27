# Schema-Driven UI Architecture (SDUI)

## 1. Vision
To enable rapid productization and high maintainability, we will implement a **Schema-Driven UI (SDUI)** system. This allows pages to be defined via configuration (YAML/JSON) rather than hardcoded Vue templates.

## 2. Core Concepts

### A. The Schema
The schema describes *what* to render, not *how*. It is platform-agnostic logic that the frontend interprets.

**Example Schema (YAML):**
```yaml
type: "Page"
layout: "StandardLayout"
meta:
  title: "User Management"
blocks:
  - type: "SectionHeader"
    props:
      title: "All Users"
      action:
        label: "Create User"
        type: "navigate"
        to: "/users/create"

  - type: "SmartTable"
    props:
      dataSource: "users.list" # Maps to an API endpoint
      columns:
        - label: "Name"
          field: "name"
          sortable: true
        - label: "Email"
          field: "email"
        - label: "Status"
          field: "status"
          type: "tag" # Renders a status tag
```

### B. The Renderer (`<SchemaRenderer />`)
A recursive Vue component that takes a schema node and renders the corresponding component.

```vue
<template>
  <component :is="resolvedComponent" v-bind="schema.props">
    <!-- Recursively render children if any -->
    <SchemaRenderer 
      v-for="child in schema.children" 
      :schema="child" 
    />
  </component>
</template>
```

### C. Component Registry
A central mapping that connects string keys (e.g., `"SmartTable"`) to actual Vue components.

```typescript
// registry.ts
import SmartTable from '~/components/smart/SmartTable.vue'
import SectionHeader from '~/components/common/SectionHeader.vue'

export const componentRegistry = {
  SmartTable,
  SectionHeader,
  // ...
}
```

## 3. Workflow

1.  **Define Schema**: Create a YAML file in `modules/{module}/schemas/` or fetch JSON from backend.
2.  **Load Schema**: A generic page (e.g., `modules/{module}/pages/[...slug].vue`) loads the schema based on the route.
3.  **Render**: The `SchemaRenderer` traverses the schema and builds the UI.

## 4. Benefits
*   **Consistency**: All tables/forms look the same because they use the same underlying components.
*   **Speed**: "Coding" a new page is just writing YAML.
*   **Flexibility**: Backend can send different schemas for different tenants (Multi-tenant).
*   **Maintenance**: Fix a bug in `SmartTable`, and it's fixed everywhere.

## 5. Implementation Steps
1.  Create `components/renderer/SchemaRenderer.vue`.
2.  Create `core/schema/registry.ts`.
3.  Implement basic "Smart Components" (Table, Form).
4.  Create a generic page loader.
