/**
 * @目的　正式端將console相關移除
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  if (!config.public.isDev) {
    console.log = () => {}
    console.warn = () => {}
    console.info = () => {}
    console.error = () => {}
    console.debug = () => {}
  }
})
