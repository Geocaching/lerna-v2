import { render } from '@testing-library/react'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Group } from 'three'
import GlbModel from '../app/GlbModel'
jest.mock('@react-three/drei', () => {
  const { Group } = require('three')
  return {
    useGLTF: () => ({ scene: new Group() })
  }
})

test('renders canvas with GLB model', () => {
  const { container } = render(
    <Canvas>
      <GlbModel
        url='/3d-models/rover/rover-body.glb'
        position={[1, 2, 3]}
        scale={2}
      />
    </Canvas>
  )

  expect(container.querySelector('canvas')).toBeTruthy()
})
