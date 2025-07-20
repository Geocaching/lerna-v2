import { Html, useGLTF } from '@react-three/drei'
import { Group, Object3D, Material } from 'three'
import { useLayoutEffect } from 'react'
import React from 'react'

interface GlbModelProps {
  /**
   * Enable or disable shadow casting for all meshes in the model
   * @default false
   */
  castShadow?: boolean
  /**
   * Called if an error occurs while loading the model
   * @param error - The error that occurred during model loading
   */
  onError?: (error: unknown) => void
  /**
   * Called after the model successfully loads,
   * Uses this to perform actions once the model is ready in the scene
   */
  onLoad?: () => void
  /**
   * Opacity of the model (0.0 to 1.0)
   * @default 1.0
   */
  opacity?: number
  /**
   * Custom material to apply to all meshes in the model. Supports built-in
   * three.js materials as well as materials created with `shaderMaterial` or
   * `RawShaderMaterial`.
   */
  material?: Material
  /**
   * Position of the model in the scene as [x, y, z] coordinates
   * @default [0, 0, 0]
   */
  position?: [number, number, number]
  /**
   * Enable or disable shadow receiving for all meshes in the model
   * @default false
   */
  receiveShadow?: boolean
  /**
   * Optional HTML content to render within the model using drei's Html component
   */
  htmlContent?: React.ReactNode
  /**
   * Rotation of the model in radians as [x, y, z] Euler angles
   * @default [0, 0, 0]
   */
  rotation?: [number, number, number]
  /**
   * Uniform scale factor for the model
   * @default 1
   */
  scale?: number
  /**
   * Path to the .glb file relative to the public directory
   */
  url: string
}

/**
 * Error boundary component that catches errors during model loading
 * and rendering, preventing the entire application from crashing
 *
 * @component
 * @example
 * <ModelErrorBoundary onError={(e) => console.error(e)}>
 *   <YourModelComponent />
 * </ModelErrorBoundary>
 */
class ModelErrorBoundary extends React.Component<
  { onError?: (error: unknown) => void; children: React.ReactNode },
  { hasError: boolean }
> {
  /**
   * Initialize the error boundary component
   *
   * @param props - Component props
   * @param props.onError - Optional callback function for error handling
   * @param props.children - React components to be rendered inside the error boundary
   */
  constructor(props: {
    onError?: (error: unknown) => void
    children: React.ReactNode
  }) {
    super(props)
    this.state = { hasError: false }
  }

  /**
   * Static lifecycle method called when an error occurs during rendering
   * Updates component state to indicate an error has occurred
   *
   * @returns New state object with hasError set to true
   */
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  /**
   * Lifecycle method called after an error has been caught
   * Invokes the onError callback if provided
   *
   * @param error - The error that was caught
   */
  componentDidCatch(error: unknown) {
    this.props.onError?.(error)
  }

  /**
   * Renders children if no error occurred, otherwise renders null
   *
   * @returns React node to be rendered
   */
  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}

/**
 * Inner component that handles the actual rendering of the GLB model
 * Separated from the main element to facilitate error boundary wrapping
 *
 * @component
 * @private
 * @param props - Component properties excluding onError (handled by error boundary)
 * @param props.url - Path to the GLB model file
 * @param props.position - 3D position of the model [x, y, z]
 * @param props.rotation - 3D rotation of the model in radians [x, y, z]
 * @param props.scale - Uniform scale factor for the model
 * @param props.castShadow - Whether the model should cast shadows
 * @param props.receiveShadow - Whether the model should receive shadows
 * @param props.opacity - Opacity of the model (0.0 to 1.0)
 * @param props.material - Material applied to all meshes in the model
 * @param props.htmlContent - Optional HTML content rendered inside the model
 * @param props.onLoad - Callback function invoked after successful model loading
 * @returns React component that renders the 3D model
 */
const GlbModelInner = ({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = false,
  receiveShadow = false,
  opacity = 1.0,
  material,
  htmlContent,
  onLoad
}: Omit<GlbModelProps, 'onError'>) => {
  const { scene } = useGLTF(url)

  useLayoutEffect(() => {
    scene.traverse(obj => {
      // Apply shadow casting and receiving
      ;(obj as Object3D).castShadow = castShadow
      ;(obj as Object3D).receiveShadow = receiveShadow

      // Apply opacity if provided and the object has a material
      const object = obj as Object3D & {
        material?: Material | Material[]
      }
      if (object.material) {
        // Override material if one was provided
        if (material) {
          if (Array.isArray(object.material)) {
            object.material = object.material.map(() => material)
          } else {
            object.material = material
          }
        }

        if (opacity !== 1.0) {
          const mats = Array.isArray(object.material)
            ? object.material
            : [object.material]
          mats.forEach((mat: Material) => {
            mat.transparent = opacity < 1.0
            mat.opacity = opacity
          })
        }
      }
    })
    onLoad?.()
  }, [scene, castShadow, receiveShadow, opacity, material, onLoad])

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={scene as Group} />
      {htmlContent != null && <Html>{htmlContent}</Html>}
    </group>
  )
}

/**
 * Component for rendering 3D GLB models in a React Three Fiber scene
 * Wraps the inner component with an error boundary for graceful error handling
 *
 * @component
 * @example
 * // Basic usage
 * <GlbModel url="/3d-models/rover/rover-body.glb" />
 *
 * // With all props
 * <GlbModel
 *   url="/3d-models/rover/rover-body.glb"
 *   position={[1, 0, 2]}
 *   scale={0.5}
 *   castShadow={true}
 *   material={new MeshBasicMaterial()}
 *   onLoad={() => console.log("Model loaded")}
 *   onError={(e) => console.error("Model failed to load", e)}
 * />
 *
 * @param props - Component properties
 * @returns React component that renders the 3D GLB model with error handling
 */
const GlbModel = (props: GlbModelProps) => {
  const { onError, ...innerProps } = props
  return (
    <ModelErrorBoundary onError={onError}>
      <GlbModelInner {...innerProps} />
    </ModelErrorBoundary>
  )
}

export default GlbModel
