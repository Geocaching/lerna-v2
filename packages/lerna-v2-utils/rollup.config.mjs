import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import path from 'path'

export default {
  plugins: [
    typescript({ outputToFilesystem: false }),
    nodeResolve(),
    commonjs(),
    terser()
  ],
  external: id => !id.startsWith('.') && !path.isAbsolute(id)
}
