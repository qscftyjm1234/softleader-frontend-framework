import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'

export interface ProductConfig {
  modules: string[]
  meta?: {
    title?: string
    description?: string
    themeColor?: string
    favicon?: string
  }
  [key: string]: any
}

/**
 * 載入產品設定檔 (YAML)
 * @param rootDir 專案根目錄 (預設為 process.cwd())
 */
export function loadProductConfig(rootDir: string = process.cwd()): ProductConfig {
  const productConfigName = process.env.PRODUCT_CONFIG || 'default'
  const configPath = path.resolve(rootDir, 'configs', `${productConfigName}.yaml`)

  let config: ProductConfig = { modules: [] }

  if (fs.existsSync(configPath)) {
    try {
      const fileContents = fs.readFileSync(configPath, 'utf8')
      const loaded = yaml.load(fileContents) as any
      if (loaded) {
        config = { ...config, ...loaded }
      }
      console.log(`[Config] Loaded configuration: ${productConfigName}`)
    } catch (e) {
      console.error(`[Config] Error loading configuration ${configPath}:`, e)
    }
  } else {
    console.warn(`[Config] Configuration file not found: ${configPath}. Loading no modules.`)
  }

  return config
}

// Singleton instance for reuse if needed, though usually called at build time
export const productConfig = loadProductConfig()
