import { act } from '@testing-library/react'
import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
}

const useCounterStore = create<CounterState>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 }))
}))

afterEach(() => {
  useCounterStore.setState({ count: 0 })
})
test('zustand store increments', () => {
  act(() => {
    useCounterStore.getState().increment()
  })
  expect(useCounterStore.getState().count).toBe(1)
})
