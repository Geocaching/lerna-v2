'use client'
import { Stars } from '@react-three/drei/core/Stars'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import GlbModel from '@/app/GlbModel'
import { Sky } from '@react-three/drei/core/Sky'

export const dynamic = 'force-static'

export const PerseverancePromo = () => (
  <div
    className={
      'flex flex-col items-center justify-start min-h-screen bg-white w-full'
    }
  >
    <div
      data-testid={'rover-explorer'}
      id={'rover-explorer'}
      className='flex justify-center bg-size-[400px] w-full h-[468px]'
    >
      <Canvas
        camera={{ fov: 15, position: [-9, 0.5, 8] }}
        className={'size-full'}
      >
        <ambientLight intensity={0.8} />
        <pointLight
          position={[-20, 10, 10]}
          color={'#f5dac1'}
          intensity={175}
        />
        <pointLight position={[5, 10, 20]} color={'#fcf3bb'} intensity={175} />
        <pointLight position={[5, 20, -10]} color={'#99cde0'} intensity={375} />
        <pointLight
          position={[10, 5, 5]}
          color={'#fab673'}
          intensity={450}
          castShadow
        />
        <Sky
          distance={140}
          sunPosition={[180, 0.01, 1]}
          turbidity={10}
          rayleigh={2}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
          inclination={0.49}
          azimuth={1}
        />
        <Stars />
        <Suspense fallback={null}>
          <GlbModel
            url='http://localhost:3000/3d-models/rover/rover-body.glb'
            castShadow
          />
        </Suspense>
        <Suspense fallback={null}>
          <GlbModel
            url='http://localhost:3000/3d-models/rover/rover-cam.glb'
            position={[-0.42243, 1.18187, 0.85338]}
            castShadow
          />
        </Suspense>
        <Suspense fallback={null}>
          <GlbModel
            url='http://localhost:3000/3d-models/rover/rover-scenery.glb'
            position={[0, 0.4, 0]}
            rotation={[0, 100, 0]}
            receiveShadow
          />
        </Suspense>
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  </div>
)

export default PerseverancePromo
