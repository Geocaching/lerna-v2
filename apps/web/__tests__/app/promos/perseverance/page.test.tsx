import { render, screen } from '@testing-library/react'
import React from 'react'
import PerseverancePromo from '@/promos/perseverance/page'

test('renders Hello, world! text', () => {
  render(<PerseverancePromo />)
  expect(screen.getByText('Hello, world!')).toBeTruthy()
})
