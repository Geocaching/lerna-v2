jest.mock('@react-three/drei', () => {
  const React = require('react')
  const { Group } = require('three')
  const Html = jest.fn(({ children }: { children: React.ReactNode }) => (
    <div data-testid='html-wrapper'>{children}</div>
  ))
  return {
    useGLTF: () => ({ scene: new Group() }),
    Html
  }
})

jest.mock('@react-three/fiber', () => {
  const React = require('react')
  return {
    Canvas: ({ children }: { children: React.ReactNode }) => (
      <canvas>{children}</canvas>
    )
  }
})

import { render } from '@testing-library/react'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Group } from 'three'
import GlbModel from '../app/GlbModel'

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

test('renders provided html content', () => {
  const htmlElement = <div data-testid='html-node'>inside</div>
  const { container } = render(
    <Canvas>
      <GlbModel
        url='/3d-models/rover/rover-body.glb'
        htmlContent={htmlElement}
      />
    </Canvas>
  )

  expect(container.querySelector('canvas')).toBeTruthy()

  const drei = require('@react-three/drei')
  const firstCall = (drei.Html as jest.Mock).mock.calls[0][0]
  expect(firstCall).toEqual(expect.objectContaining({ children: htmlElement }))
  expect(container.querySelector('[data-testid="html-node"]')).toBeTruthy()
})
