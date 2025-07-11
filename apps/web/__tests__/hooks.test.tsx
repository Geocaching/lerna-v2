import React from 'react'
import { renderHook, act } from '@testing-library/react'

function useCounter(initial: number = 0) {
  const [count, setCount] = React.useState(initial)
  const increment = () => setCount(c => c + 1)
  return { count, increment }
}

test('increments value', () => {
  const { result } = renderHook(() => useCounter())
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(1)
})
