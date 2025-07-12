import { render } from '@testing-library/react'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { mock, jest, test, expect } from 'bun:test'
import { Group } from 'three'

mock.module('@react-three/drei', () => ({
  useGLTF: jest.fn(() => ({ scene: new Group() }))
}))

test('renders canvas with GLB model', async () => {
  const { default: GlbModel } = await import('../app/GlbModel')

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
