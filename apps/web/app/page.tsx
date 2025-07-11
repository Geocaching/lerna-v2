'use client'
import { Canvas } from '@react-three/fiber'
import SpinningBox from './SpinningBox'

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
