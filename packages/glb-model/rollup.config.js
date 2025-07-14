import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import path from 'path'

export default {
  input: './src/index.tsx',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    }
  ],
  external: id => !id.startsWith('.') && !path.isAbsolute(id),
  plugins: [typescript(), nodeResolve(), commonjs()]
}
