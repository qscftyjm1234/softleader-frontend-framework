import type { NuxtConfig } from 'nuxt/schema'

/**
 * @功能 安全性 Header 設定
 * @description 設定各種安全性相關的 HTTP Response Headers
 */
export const securityConfig: NuxtConfig['routeRules'] = {
  '/**': {
    headers: {
      /**
       * 防止 Clickjacking 攻擊
       * SAMEORIGIN: 只允許同源網站嵌入 iframe
       */
      'X-Frame-Options': 'SAMEORIGIN',

      /**
       * 防止 MIME Type Sniffing
       * 瀏覽器不會自動偵測檔案類型，防止惡意檔案偽裝
       */
      'X-Content-Type-Options': 'nosniff',

      /**
       * XSS 過濾器（較舊的保護機制）
       * 現代瀏覽器建議搭配 CSP 使用
       */
      'X-XSS-Protection': '1; mode=block',

      /**
       * 控制 Referrer 資訊傳送
       * strict-origin-when-cross-origin: 跨域時只傳送 origin
       */
      'Referrer-Policy': 'strict-origin-when-cross-origin',

      /**
       * 強制 HTTPS 連線 (HSTS)
       * max-age: 1年 (31536000秒)
       * includeSubDomains: 包含子網域
       * @注意 確保網站有有效的 SSL 憑證再啟用
       */
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',

      /**
       * 權限策略 - 限制瀏覽器 API 使用
       * 禁用相機、麥克風、地理位置等敏感 API
       */
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',

      /**
       * 內容安全策略 (CSP)
       * @注意 這是基本設定，可根據專案需求調整
       * - default-src 'self': 預設只允許同源載入
       * - script-src 'self' 'unsafe-inline' 'unsafe-eval': Vue/Nuxt 需要 inline script
       * - style-src 'self' 'unsafe-inline': 允許 inline style
       * - img-src 'self' data: https:: 允許 data URI 與 HTTPS 圖片
       * - font-src 'self' https://fonts.gstatic.com: 允許 Google Fonts
       * - connect-src 'self' https:: 允許 HTTPS API 請求
       */
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: https: blob:",
        "font-src 'self' https://fonts.gstatic.com data:",
        "connect-src 'self' https: wss:",
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'"
      ].join('; ')
    }
  }
}
