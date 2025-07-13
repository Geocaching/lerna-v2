'use client'
import { useGLTF } from '@react-three/drei'
import { Group } from 'three'

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
}

const GlbModel = ({ url, position = [0, 0, 0], scale = 1 }: GlbModelProps) => {
  const { scene } = useGLTF(url)
  return (
    <group position={position} scale={scale}>
      <primitive object={scene as Group} />
    </group>
  )
}

export default GlbModel
