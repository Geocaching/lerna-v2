'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'

const SpinningBox = () => {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01
      ref.current.rotation.y += 0.01
    }
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  )
}

const Home = () => {
  return (
    <main style={{ height: '100vh', width: '100%' }}>
      <Canvas>
        <SpinningBox />
      </Canvas>
    </main>
  )
}

export default Home
