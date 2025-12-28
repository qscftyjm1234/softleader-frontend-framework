/**
 * 語系管理 Composable
 *
 * 封裝 @nuxtjs/i18n 的常用功能，提供更方便的 API
 * @returns 包含語系狀態與操作方法的物件
 * - `locale`: 目前的語系代碼 (Ref)
 * - `locales`: 所有可用的語系清單 (Ref)
 * - `currentLocale`: 目前的語系詳細設定 (Computed)
 * - `availableLocales`: 其他可切換的語系 (Computed)
 * - `setLocale`: 切換語系的函式
 *
 * @example
 * ```ts
 * const { currentLocale, availableLocales, setLocale } = useLanguage()
 *
 * // currentLocale 資料結構範例：
 * // {
 * //   code: 'zh',
 * //   name: '中文',
 * //   iso: 'zh-TW',
 * //   file: 'zh-TW.json'
 * // }
 *
 * // 切換語系
 * setLocale('en')
 * ```
 */
export const useLanguage = () => {
  const { locale, locales, setLocale } = useI18n()

  /**
   * 目前的語系設定物件
   */
  const currentLocale = computed(() => {
    return (locales.value as any[]).find((l) => l.code === locale.value)
  })

  /**
   * 其他可用的語系清單 (排除目前語系)
   * 用於語言切換選單
   */
  const availableLocales = computed(() => {
    return (locales.value as any[]).filter((l) => l.code !== locale.value)
  })

  return {
    locale,
    locales,
    currentLocale,
    availableLocales,
    setLocale
  }
}
