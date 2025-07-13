import { render } from '@testing-library/react'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { mock, test, expect } from 'bun:test'
import { Group } from 'three'

test('renders canvas with GLB model', async () => {
  mock.module('@react-three/drei', () => ({
    useGLTF: () => ({ scene: new Group() })
  }))
  const { default: GlbModel } = await import(
    `../app/GlbModel?test=${Math.random()}`
  )

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
