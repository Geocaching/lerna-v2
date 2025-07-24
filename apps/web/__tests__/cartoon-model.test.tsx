import { render } from '@testing-library/react'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import CartoonModel from '../app/CartoonModel'

test('renders canvas with cartoon model', () => {
  const { container } = render(
    <Canvas>
      <CartoonModel url='/3d-models/rover/rover-body.glb' />
    </Canvas>
  )
  expect(container.querySelector('canvas')).toBeTruthy()
})
