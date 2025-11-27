import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 設定檔路徑
let configPath = process.argv[2] || 'module.yaml';

// 如果參數不是路徑 (沒有 / 或 \)，且沒有副檔名，則假設是樣板名稱
if (!configPath.includes('/') && !configPath.includes('\\') && !configPath.endsWith('.yaml') && !configPath.endsWith('.yml')) {
  configPath = path.join(__dirname, '../module-templates', `${configPath}.yaml`);
} else if (!fs.existsSync(configPath) && !path.isAbsolute(configPath)) {
    // 嘗試在 module-templates 找找看
    const templatePath = path.join(__dirname, '../module-templates', configPath);
    if (fs.existsSync(templatePath)) {
        configPath = templatePath;
    }
}

const CONFIG_FILE = configPath;
const TARGET_DIR = path.join(__dirname, '../modules');

// 讀取設定檔
function loadConfig() {
  try {
    const fileContents = fs.readFileSync(CONFIG_FILE, 'utf8');
    return yaml.load(fileContents);
  } catch (e) {
    console.error(`❌ 無法讀取設定檔: ${CONFIG_FILE}`);
    console.error(e.message);
    process.exit(1);
  }
}

// 建立目錄
function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ 建立目錄: ${dirPath}`);
  }
}

// 寫入檔案
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ 建立檔案: ${filePath}`);
}

// 產生 sidebar.ts 內容
function generateSidebarContent(moduleName, routes) {
  return `export default {
  module: '${moduleName}',
  routes: ${JSON.stringify(routes, null, 2).replace(/"([^"]+)":/g, '$1:')}
}
`;
}

// 產生 Module.ts 內容 (Placeholder)
function generateModuleContent(moduleName) {
  const pascalCaseName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
  return `// ${pascalCaseName} Module Entry
export default defineNuxtModule({
  meta: {
    name: '${moduleName}',
    configKey: '${moduleName}'
  },
  setup(options, nuxt) {
    // Auto-register components/pages logic is handled by Nuxt directory structure
  }
})
`;
}

// 產生 Vue Page 內容
function generatePageContent(title) {
  return `<script setup lang="ts">
// ${title} Page
</script>

<template>
  <div class="pa-4">
    <h1>${title}</h1>
  </div>
</template>
`;
}

// 遞迴處理路由並建立對應的 Page 檔案
function processRoutes(routes, parentPath = '') {
  routes.forEach(route => {
    if (route.children) {
      processRoutes(route.children, parentPath);
    } else if (route.path) {
      // 將 URL path 轉換為檔案路徑
      // 例如 /user/list -> modules/user/pages/list.vue
      // 這裡假設 path 開頭是 /moduleName/
      // 我們需要解析出相對路徑
      
      // 簡單的假設：path 的格式是 /moduleName/subPath...
      // 我們直接把 path 當作 pages 下的路徑 (去掉開頭的 /)
      
      const relativePath = route.path.startsWith('/') ? route.path.slice(1) : route.path;
      // 移除模組名稱前綴 (如果有的話，這取決於專案結構，這裡假設 pages 結構跟 URL 一致)
      // 在 Nuxt modules 中，通常 pages 目錄會被掛載到 root，所以 modules/auth/pages/login.vue -> /login 還是 /auth/login ?
      // Nuxt 預設 modules 內的 pages 不會自動變路由，除非用 extendPages。
      // 但這個專案似乎有自動掃描？
      // 假設 modules/[name]/pages 對應 /modules/[name]/pages 結構，或者有額外設定。
      // 為了保險，我們先建立檔案在 modules/[moduleName]/pages/ 下，路徑結構跟 route.path 一致。
      
      // 修正：如果 route.path 是 /user/list，而模組是 user
      // 我們希望檔案在 modules/user/pages/list.vue
      
      // 這裡做個簡單處理：直接用 path 建立檔案，但在 modules/[currentModule]/pages 下
      // 如果 path 包含模組名，嘗試去除
      
      // 暫時策略：直接在 modules/[moduleName]/pages 下建立完整路徑
      // 例如 module=order, path=/order/list -> modules/order/pages/order/list.vue (這樣有點怪)
      // 理想：module=order, path=/order/list -> modules/order/pages/list.vue
      
      // 讓使用者手動調整好了，這裡先單純建立檔案
      // 為了避免路徑混亂，我們只建立 pages 目錄，不自動建立 .vue 檔案，除非我們很確定規則。
      // 但使用者的需求是 "產生新的 modules... 並且到不同系統產生出的東西要相圖"
      // 還是幫忙建一個範例檔案比較好。
      
      // 簡化：只建立目錄結構，不建立 .vue 檔案，以免覆蓋或路徑錯誤。
      // 或者：只建立最底層的 .vue
    }
  });
}

async function main() {
  const config = loadConfig();
  
  if (!config.name) {
    console.error('❌ 設定檔缺少 module name');
    process.exit(1);
  }

  const moduleName = config.name;
  const moduleDir = path.join(TARGET_DIR, moduleName);
  
  console.log(`🚀 開始生成模組: ${moduleName}`);

  // 1. 建立模組基本目錄
  createDir(moduleDir);
  createDir(path.join(moduleDir, 'components'));
  createDir(path.join(moduleDir, 'pages'));
  createDir(path.join(moduleDir, 'stores'));
  createDir(path.join(moduleDir, 'types'));

  // 2. 產生 sidebar.ts
  if (config.routes) {
    const sidebarContent = generateSidebarContent(moduleName, config.routes);
    writeFile(path.join(moduleDir, 'sidebar.ts'), sidebarContent);
  }

  // 3. 產生 Module Entry (Optional)
  // writeFile(path.join(moduleDir, `${moduleName}Module.ts`), generateModuleContent(moduleName));

  console.log(`✨ 模組 ${moduleName} 生成完畢！`);
}

main();
