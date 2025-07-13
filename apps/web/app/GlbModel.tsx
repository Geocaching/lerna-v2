'use client'
import { useGLTF } from '@react-three/drei'
import { Group, Object3D } from 'three'
import { useLayoutEffect } from 'react'
import React from 'react'

interface GlbModelProps {
  /**
   * Path to the .glb file relative to the public directory
   */
  url: string
  /**
   * Position of the model in the scene
   */
  position?: [number, number, number]
  /**
   * Uniform scale factor for the model
   */
  scale?: number
  /**
   * Enable or disable shadow casting for all meshes in the model
   */
  castShadow?: boolean
  /**
   * Called after the model successfully loads
   */
  onLoad?: () => void
  /**
   * Called if an error occurs while loading the model
   */
  onError?: (error: unknown) => void
}

class ModelErrorBoundary extends React.Component<
  { onError?: (error: unknown) => void; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: {
    onError?: (error: unknown) => void
    children: React.ReactNode
  }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    this.props.onError?.(error)
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}

const GlbModelInner = ({
  url,
  position = [0, 0, 0],
  scale = 1,
  castShadow = false,
  onLoad
}: Omit<GlbModelProps, 'onError'>) => {
  const { scene } = useGLTF(url)

  useLayoutEffect(() => {
    scene.traverse(obj => {
      ;(obj as Object3D).castShadow = castShadow
    })
    onLoad?.()
  }, [scene, castShadow, onLoad])

  return (
    <group position={position} scale={scale}>
      <primitive object={scene as Group} />
    </group>
  )
}

const GlbModel = (props: GlbModelProps) => {
  const { onError, ...innerProps } = props;
  return (
    <ModelErrorBoundary onError={onError}>
      <GlbModelInner {...innerProps} />
    </ModelErrorBoundary>
  );
};

export default GlbModel
