# @geocaching/glb-model

A React component for loading and displaying GLB models with [React Three Fiber](https://github.com/pmndrs/react-three-fiber).

## Installation

```bash
npm install @geocaching/glb-model
# or
bun add @geocaching/glb-model
```

Make sure you have `@react-three/fiber` and `@react-three/drei` installed in your project.

## Usage

```tsx
import { Canvas } from '@react-three/fiber'
import GlbModel from '@geocaching/glb-model'

export default function Example() {
  return (
    <Canvas>
      <GlbModel url="/path/to/model.glb" />
    </Canvas>
  )
}
```

The component accepts props for positioning, scaling, shadow options and more. Refer to the TypeScript definitions for full details.
