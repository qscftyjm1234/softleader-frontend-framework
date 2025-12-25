/**
 * Schema-Driven UI Core Types
 */

/**
 * Represents a single node in the UI schema tree.
 */
export interface SchemaNode {
  /**
   * The type of component to render (e.g., 'SmartTable', 'SectionHeader', 'div').
   * Must be registered in the ComponentRegistry.
   */
  type: string

  /**
   * Props to pass to the component.
   */
  props?: Record<string, any>

  /**
   * Nested children nodes.
   */
  children?: SchemaNode[]

  /**
   * Unique identifier for the node (optional, useful for keys).
   */
  id?: string

  /**
   * Conditional rendering logic (optional).
   * e.g., "user.isAdmin"
   */
  vIf?: string
}

/**
 * Represents the schema for a full page.
 */
export interface PageSchema {
  type: 'Page'
  meta?: {
    title?: string
    description?: string
  }
  layout?: string
  blocks: SchemaNode[]
}
