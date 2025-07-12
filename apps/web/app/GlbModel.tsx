'use client'
import { useGLTF } from '@react-three/drei'
import { Group } from 'three'

interface GlbModelProps {
  /**
   * Path to the .glb file relative to the public directory
   */
  url: string
}

const GlbModel = ({ url }: GlbModelProps) => {
  const { scene } = useGLTF(url)
  return <primitive object={scene as Group} />
}

export default GlbModel
