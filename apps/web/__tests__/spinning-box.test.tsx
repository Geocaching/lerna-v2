import { render } from '@testing-library/react'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import SpinningBox from '../app/SpinningBox'

test('renders canvas with spinning box', () => {
  if (!(globalThis as any).ResizeObserver) {
    const Polyfill = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    ;(globalThis as any).ResizeObserver = Polyfill
    if ((globalThis as any).window) {
      ;(globalThis as any).window.ResizeObserver = Polyfill
    }
  }
  const { container } = render(
    <Canvas>
      <SpinningBox />
    </Canvas>
  )
  expect(container.querySelector('canvas')).toBeTruthy()
})
