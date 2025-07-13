'use client'

import { Stars, SpotLight } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export const dynamic = 'force-static'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import GlbModel from '@/app/GlbModel'
import { Sky } from '@react-three/drei/core/Sky'

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
        <ambientLight intensity={0.8} castShadow />
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
        <SpotLight
          position={[-7, 2, 8]}
          angle={0.5}
          penumbra={0.5}
          intensity={1.5}
          distance={20}
          color='#ffffff'
          castShadow
          attenuation={5}
          anglePower={5}
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
            url='http://localhost:3000/3d-models/rover/rover-scenery.glb'
            position={[0, 0.4, 0]}
            rotation={[0, 100, 0]}
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
