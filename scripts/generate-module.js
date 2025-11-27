import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = path.join(__dirname, '../modules');
const TEMPLATES_DIR = path.join(__dirname, '../module-templates');

// 解析設定檔路徑
function resolveConfigPath(input) {
  // 如果是絕對路徑或相對路徑
  if (input.includes('/') || input.includes('\\') || input.endsWith('.yaml') || input.endsWith('.yml')) {
    if (fs.existsSync(input)) return input;
    const templatePath = path.join(TEMPLATES_DIR, input);
    if (fs.existsSync(templatePath)) return templatePath;
  } else {
    // 假設是樣板名稱
    const templatePath = path.join(TEMPLATES_DIR, `${input}.yaml`);
    if (fs.existsSync(templatePath)) return templatePath;
  }
  return null;
}

// 讀取設定檔
function loadConfig(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return yaml.load(fileContents);
  } catch (e) {
    console.error(`❌ 無法讀取設定檔: ${filePath}`);
    console.error(e.message);
    return null;
  }
}

// 建立目錄
function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    // console.log(`✅ 建立目錄: ${dirPath}`);
  }
}

// 寫入檔案
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ 建立檔案: ${filePath}`);
}

// 產生 sidebar.ts 內容
function generateSidebarContent(moduleName, routes) {
  // Helper to remove schema from routes recursively
  const cleanRoutes = (items) => {
    return items.map(item => {
      // Destructure schema out, keep everything else
      const { schema, children, ...rest } = item;
      const newItem = { ...rest };
      
      if (children) {
        newItem.children = cleanRoutes(children);
      }
      
      return newItem;
    });
  };

  const cleanedRoutes = cleanRoutes(routes);

  return `export default {
  module: '${moduleName}',
  routes: ${JSON.stringify(cleanedRoutes, null, 2).replace(/"([^"]+)":/g, '$1:')}
}
`;
}

// 產生 Vue Page 內容
function generatePageContent(title, schema) {
  // 預設 Schema
  const defaultSchema = {
    type: 'Page',
    meta: { title: title },
    blocks: [
      {
        type: 'div',
        props: { class: 'pa-4' },
        children: [
          { type: 'h1', props: { class: 'text-h4 mb-4' }, children: [] },
          { 
            type: 'div', 
            props: { class: 'text-body-1' }, 
            children: [] 
          }
        ]
      }
    ]
  };

  const pageSchema = schema || defaultSchema;
  const schemaString = JSON.stringify(pageSchema, null, 2);

  return `<script setup lang="ts">
import SchemaRenderer from '~/components/renderer/SchemaRenderer.vue'
import type { PageSchema } from '~/core/schema/types'

const pageSchema: PageSchema = ${schemaString}
</script>

<template>
  <div>
    <SchemaRenderer 
      v-for="(block, i) in pageSchema.blocks" 
      :key="i" 
      :schema="block" 
    />
  </div>
</template>
`;
}

// 遞迴處理路由並建立對應的 Page 檔案
function processRoutes(routes, moduleName, moduleDir) {
  routes.forEach(route => {
    if (route.children) {
      processRoutes(route.children, moduleName, moduleDir);
    } 
    
    if (route.path) {
      let relativePath = route.path.startsWith('/') ? route.path.slice(1) : route.path;
      
      if (relativePath.startsWith(moduleName + '/')) {
        relativePath = relativePath.slice(moduleName.length + 1);
      } else if (relativePath === moduleName) {
        relativePath = 'index';
      }

      if (!relativePath.endsWith('.vue')) {
        relativePath += '.vue';
      }

      const fullPath = path.join(moduleDir, 'pages', relativePath);
      const dirPath = path.dirname(fullPath);

      createDir(dirPath);

      const content = generatePageContent(route.label || 'Untitled', route.schema);
      writeFile(fullPath, content);
    }
  });
}

// 單一模組生成邏輯
async function generateModule(input) {
  const configPath = resolveConfigPath(input);
  if (!configPath) {
    console.error(`❌ 找不到設定檔或樣板: ${input}`);
    return;
  }

  const config = loadConfig(configPath);
  if (!config || !config.name) {
    console.error(`❌ 設定檔無效或缺少 module name: ${configPath}`);
    return;
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

  // 3. 產生 Pages
  if (config.routes) {
    processRoutes(config.routes, moduleName, moduleDir);
  }

  console.log(`✨ 模組 ${moduleName} 生成完畢！\n`);
}

// 監聽模組變更
function watchModules() {
  console.log('👀 正在監聽模組樣板變更 (Watch Mode)...\n');
  
  if (!fs.existsSync(TEMPLATES_DIR)) {
    console.error(`❌ 找不到樣板目錄: ${TEMPLATES_DIR}`);
    return;
  }

  let debounceTimer;
  
  fs.watch(TEMPLATES_DIR, (eventType, filename) => {
    if (!filename || (!filename.endsWith('.yaml') && !filename.endsWith('.yml'))) return;

    // 簡單的防抖動 (Debounce)，避免短時間內重複觸發
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      console.log(`\n🔄 偵測到檔案變更: ${filename}`);
      await generateModule(filename);
    }, 100);
  });
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('請提供模組名稱，例如: node scripts/generate-module.js example');
    console.log('或者使用 "all" 生成所有模組: node scripts/generate-module.js all');
    console.log('或者使用 "watch" 監聽變更: node scripts/generate-module.js watch');
    process.exit(1);
  }

  if (args[0] === 'watch') {
    // 先執行一次全部生成
    console.log('📦 初次執行: 生成所有模組...');
    if (fs.existsSync(TEMPLATES_DIR)) {
      const files = fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
      for (const file of files) {
        await generateModule(file);
      }
    }
    // 然後開始監聽
    watchModules();
  } else if (args[0] === 'all') {
    console.log('📦 正在掃描所有模組樣板...\n');
    if (fs.existsSync(TEMPLATES_DIR)) {
      const files = fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
      for (const file of files) {
        await generateModule(file);
      }
    } else {
      console.error(`❌ 找不到樣板目錄: ${TEMPLATES_DIR}`);
    }
  } else {
    // 支援多個參數: node scripts/generate-module.js auth product
    for (const arg of args) {
      await generateModule(arg);
    }
  }
}

main();
