'use client'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { useRef } from 'react'

const SpinningBox = () => {
  const ref = useRef<Mesh>(null!)
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01
      ref.current.rotation.y += 0.01
    }
  })
  return (
    <mesh ref={ref} data-testid='spinning-box'>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default SpinningBox
