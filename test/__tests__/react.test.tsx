import { render, screen } from '@testing-library/react'
import React from 'react'

const Hello = ({ name }: { name: string }) => {
  return <div>Hello {name}</div>
}

test('renders greeting', () => {
  render(<Hello name='World' />)
  expect(screen.getByText('Hello World')).toBeTruthy()
})
