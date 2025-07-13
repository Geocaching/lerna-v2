import { render, screen } from '@testing-library/react'
import React from 'react'
import { mock, test, expect } from 'bun:test'

test('renders promo canvas', async () => {
  mock.module('@react-three/drei', () => ({
    Stars: () => null,
    SpotLight: () => null,
    useGLTF: () => ({ scene: new (require('three').Group)() })
  }))
  mock.module('@react-three/postprocessing', () => ({
    EffectComposer: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    Bloom: () => null
  }))
  mock.module('@react-three/drei/core/Sky', () => ({
    Sky: () => null
  }))
  mock.module('@react-three/drei/core/Stars', () => ({
    Stars: () => null
  }))
  const { PerseverancePromo } = await import(
    '../../../../app/promos/perseverance/page?test=' + Math.random()
  )
  const { container } = render(<PerseverancePromo />)
  expect(screen.getByTestId('rover-explorer')).toBeInTheDocument()
  expect(container.querySelector('canvas')).toBeTruthy()
})
