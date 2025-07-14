import baseConfig from '@geocaching/lerna-v2-utils/rollup.config'

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
  ]
}
