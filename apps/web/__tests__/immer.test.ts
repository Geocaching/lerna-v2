import { produce } from 'immer'

test('immer produces new state', () => {
  const state = { count: 0 }
  const next = produce(state, draft => {
    draft.count += 1
  })

  expect(state.count).toBe(0)
  expect(next.count).toBe(1)
})
