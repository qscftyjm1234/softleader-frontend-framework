import { describe, it, expect } from 'vitest'
import { add, isEven } from '../../utils/math'

describe('math utils', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('checks if number is even', () => {
    expect(isEven(4)).toBe(true)
    expect(isEven(5)).toBe(false)
  })
})
