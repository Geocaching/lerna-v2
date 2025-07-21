jest.mock('@react-three/drei', () => {
  const React = require('react')
  const { Group } = require('three')
  return {
    Stars: () => null,
    SpotLight: () => null,
    useGLTF: () => ({ scene: new Group() })
  }
})
jest.mock('@react-three/postprocessing', () => ({
  EffectComposer: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  Bloom: () => null
}))
jest.mock('@react-three/drei/core/Sky', () => ({
  Sky: () => null
}))
jest.mock('@react-three/drei/core/Stars', () => ({
  Stars: () => null
}))

import { render, screen } from '@testing-library/react'
import React from 'react'
import PerseverancePromo from '@/app/promos/perseverance/page'

test('renders promo canvas', () => {
  const { container } = render(<PerseverancePromo />)
  expect(screen.getByTestId('rover-explorer')).toBeInTheDocument()
  expect(container.querySelector('canvas')).toBeTruthy()
})
