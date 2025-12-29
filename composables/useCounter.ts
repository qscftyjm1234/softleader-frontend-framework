/**
 * 計數器 Composable
 * @returns 計數器相關方法
 */
export const useCounter = () => {
  const count = useState('count', () => 0)

  const inc = (delta = 1) => (count.value += delta)
  const dec = (delta = 1) => (count.value -= delta)
  const set = (val: number) => (count.value = val)
  const reset = (val = 0) => (count.value = val)
  const get = () => count.value

  // Compatibility alias
  const addCount = () => inc()

  return {
    count,
    inc,
    dec,
    set,
    reset,
    get,
    addCount
  }
}
