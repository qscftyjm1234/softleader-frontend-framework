// /// <reference types="vitest/config" />
// // vitest.config.ts
// import { defineConfig } from 'vitest/config'
// import path from 'path'

// /**
//  * 測試這檔事
//  * pnpm add -D vitest @vitest/ui @vue/test-utils jsdom
//  */
// import { fileURLToPath } from 'node:url'
// // import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
// const dirname =
//   typeof __dirname !== 'undefined'
//     ? __dirname
//     : path.dirname(fileURLToPath(import.meta.url))

// // More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
// export default defineConfig({
//   resolve: {
//     alias: {
//       '~': path.resolve(__dirname, '.')
//     }
//   },
//   test: {
//     environment: 'jsdom',
//     globals: true,
//     deps: {
//       inline: ['@vue']
//     },
//     projects: [
//       {
//         extends: true,
//         plugins: [
//           // The plugin will run tests for the stories defined in your Storybook config
//           // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
//           // storybookTest({
//           //   configDir: path.join(dirname, '.storybook')
//           // })
//         ],
//         test: {
//           name: 'storybook',
//           browser: {
//             enabled: true,
//             headless: true,
//             provider: 'playwright',
//             instances: [
//               {
//                 browser: 'chromium'
//               }
//             ]
//           },
//           setupFiles: ['.storybook/vitest.setup.ts']
//         }
//       }
//     ]
//   }
// })
