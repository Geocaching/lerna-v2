'use client'
export const dynamic = 'force-static'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import GlbModel from '@/app/GlbModel'

export const PerseverancePromo = () => (
  <div
    className={
      'flex flex-col items-center justify-start min-h-screen bg-white w-full'
    }
  >
    <div
      data-testid={'rover-explorer'}
      id={'rover-explorer'}
      className='flex justify-center bg-size-[400px] w-full max-w-full'
    >
      <Canvas camera={{ fov: 20 }} style={{ width: '400px', height: '400px' }}>
        <ambientLight />
        <Suspense fallback={null}>
          <GlbModel
            url='https://gs-strapi.s3.us-east-1.amazonaws.com/rover_body_44b8019c95.glb'
            castShadow
          />
        </Suspense>
      </Canvas>
    </div>
  </div>
)

export default PerseverancePromo
