'use client'
import { Canvas } from '@react-three/fiber'
import SpinningBox from './SpinningBox'
import CartoonModel from './CartoonModel'

const Home = () => {
  return (
    <main style={{ height: '100vh', width: '100%' }}>
      <Canvas>
        <CartoonModel url='/3d-models/rover/rover-body.glb' scale={1.5} />
        <SpinningBox />
      </Canvas>
    </main>
  )
}

export default Home
