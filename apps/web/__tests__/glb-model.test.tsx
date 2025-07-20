jest.mock('@react-three/drei', () => {
  const React = require('react')
  const { Group, Mesh, BoxGeometry, MeshBasicMaterial } = require('three')
  const Html = jest.fn(({ children }: { children: React.ReactNode }) => (
    <div data-testid='html-wrapper'>{children}</div>
  ))
  const scenes: any[] = []
  return {
    useGLTF: () => {
      const group = new Group()
      const mesh = new Mesh(new BoxGeometry(), new MeshBasicMaterial())
      group.add(mesh)
      scenes.push(group)
      return { scene: group }
    },
    Html,
    shaderMaterial: jest.fn((...args) => {
      const { shaderMaterial } = jest.requireActual('@react-three/drei')
      return shaderMaterial(...args)
    }),
    __scenes: scenes
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

import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import GlbModel from '@geocaching/glb-model'
import { RawShaderMaterial, MeshBasicMaterial } from 'three'
import { shaderMaterial } from '@react-three/drei'

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

test('applies provided MeshBasicMaterial', async () => {
  const material = new MeshBasicMaterial()
  const drei = require('@react-three/drei')
  const { __scenes } = drei

  render(
    <Canvas>
      <GlbModel url='/model.glb' material={material} />
    </Canvas>
  )

  await waitFor(() => {
    expect(__scenes[__scenes.length - 1].children[0].material).toBe(material)
  })
})

test('applies shaderMaterial instance', async () => {
  const CustomMat = shaderMaterial({}, 'void main(){}', 'void main(){}')
  const material = new CustomMat()
  const drei = require('@react-three/drei')
  const { __scenes } = drei

  render(
    <Canvas>
      <GlbModel url='/model.glb' material={material} />
    </Canvas>
  )

  await waitFor(() => {
    expect(__scenes[__scenes.length - 1].children[0].material).toBe(material)
  })
})

test('applies RawShaderMaterial instance', async () => {
  const material = new RawShaderMaterial({
    vertexShader: 'void main(){}',
    fragmentShader: 'void main(){}'
  })
  const drei = require('@react-three/drei')
  const { __scenes } = drei

  render(
    <Canvas>
      <GlbModel url='/model.glb' material={material} />
    </Canvas>
  )

  await waitFor(() => {
    expect(__scenes[__scenes.length - 1].children[0].material).toBe(material)
  })
})
