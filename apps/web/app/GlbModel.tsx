'use client'
import { useGLTF } from '@react-three/drei'
import { Group, Object3D } from 'three'
import { useEffect } from 'react'

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

const GlbModel = ({
  url,
  position = [0, 0, 0],
  scale = 1,
  castShadow = false,
  onLoad,
  onError
}: GlbModelProps) => {
  let scene: Group
  try {
    ;({ scene } = useGLTF(url))
  } catch (err) {
    onError?.(err)
    throw err
  }

  useEffect(() => {
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

export default GlbModel
