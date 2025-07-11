import { render } from '@testing-library/react'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import SpinningBox from '../app/SpinningBox'

test('renders canvas with spinning box', () => {
  const { container } = render(
    <Canvas>
      <SpinningBox />
    </Canvas>
  )
  expect(container.querySelector('canvas')).toBeTruthy()
})
