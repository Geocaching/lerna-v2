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

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `url` | `string` | – | Path to the `.glb` file relative to the public directory |
| `position` | `[number, number, number]` | `[0, 0, 0]` | Position of the model in the scene |
| `rotation` | `[number, number, number]` | `[0, 0, 0]` | Rotation of the model in radians |
| `scale` | `number` | `1` | Uniform scale factor for the model |
| `opacity` | `number` | `1.0` | Opacity of the model |
| `castShadow` | `boolean` | `false` | Whether the model should cast shadows |
| `receiveShadow` | `boolean` | `false` | Whether the model should receive shadows |
| `onLoad` | `() => void` | – | Called after the model successfully loads |
| `onError` | `(error: unknown) => void` | – | Called if an error occurs while loading |
| `htmlContent` | `React.ReactNode` | – | Optional HTML content rendered inside the model |
