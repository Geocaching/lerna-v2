import { render, screen } from '@testing-library/react'
import React from 'react'
import { PerseverancePromo } from '@/promos/perseverance/page'

test('renders promo canvas', () => {
  const { container } = render(<PerseverancePromo />)
  expect(screen.getByTestId('rover-explorer')).toBeInTheDocument()
  expect(container.querySelector('canvas')).toBeTruthy()
})
