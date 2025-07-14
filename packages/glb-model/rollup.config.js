import baseConfig from '@geocaching/lerna-v2-utils/rollup.config'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import path from 'path'

export default {
  ...baseConfig,
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
  plugins: [
    baseConfig.plugins[0],
    nodeResolve(),
    commonjs(),
    baseConfig.plugins[1]
  ]
}
