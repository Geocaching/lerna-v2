import { renderHook, waitFor } from '@testing-library/react'
import useSWR from 'swr'

const fetcher = (key: string) => Promise.resolve(`data for ${key}`)

test('swr fetches data', async () => {
  const { result } = renderHook(() => useSWR('test-key', fetcher))
  await waitFor(() => expect(result.current.data).toBe('data for test-key'))
})
