import { render, screen } from '@testing-library/react'
import React from 'react'

function Hello({ name }: { name: string }) {
  return <div>Hello {name}</div>
}

test('renders greeting', () => {
  render(<Hello name='World' />)
  expect(screen.getByText('Hello World')).toBeTruthy()
})
