import { shaderMaterial } from '@react-three/drei'
import { Color, Vector3 } from 'three'

const CartoonMaterial = shaderMaterial(
  {
    uColor: new Color(0xffffff),
    uLightDir: new Vector3(1, 1, 1),
    uEdgeThreshold: 0.2
  },
  `varying vec3 vNormal;\nvarying vec3 vViewDir;\n\nvoid main() {\n  vNormal = normalize(normalMatrix * normal);\n  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n  vViewDir = -mvPosition.xyz;\n  gl_Position = projectionMatrix * mvPosition;\n}`,
  `uniform vec3 uColor;\nuniform vec3 uLightDir;\nuniform float uEdgeThreshold;\n\nvarying vec3 vNormal;\nvarying vec3 vViewDir;\n\nvoid main() {\n  vec3 lightDir = normalize(uLightDir);\n  float diffuse = max(dot(vNormal, lightDir), 0.0);\n  float levels = 3.0;\n  float toon = floor(diffuse * levels) / levels;\n  vec3 base = uColor * toon;\n  float edge = abs(dot(normalize(vNormal), normalize(vViewDir)));\n  if (edge < uEdgeThreshold) {\n    base = vec3(0.0, 0.0, 0.0);\n  }\n  gl_FragColor = vec4(base, 1.0);\n}`
)

export default CartoonMaterial
