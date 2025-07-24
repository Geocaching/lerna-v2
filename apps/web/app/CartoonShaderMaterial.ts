import { shaderMaterial } from '@react-three/drei'
import { Color, Vector3 } from 'three'

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uLightDir;
  uniform float uEdgeThreshold;

  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec3 lightDir = normalize(uLightDir);
    float diffuse = max(dot(vNormal, lightDir), 0.0);
    float levels = 3.0;
    float toon = floor(diffuse * levels) / levels;
    vec3 base = uColor * toon;
    float edge = abs(dot(normalize(vNormal), normalize(vViewDir)));
    if (edge < uEdgeThreshold) {
      base = vec3(0.0, 0.0, 0.0);
    }
    gl_FragColor = vec4(base, 1.0);
  }
`

const CartoonMaterial = shaderMaterial(
  {
    uColor: new Color(0xffffff),
    uLightDir: new Vector3(1, 1, 1),
    uEdgeThreshold: 0.2
  },
  vertexShader,
  fragmentShader
)

export default CartoonMaterial
