import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      globals: {
        axios: 'axios',
        'isomorphic-ws': 'WebSocket',
      },
      name: 'scalingo',
    },
    {
      file: pkg.module,
      format: 'es',
      globals: {
        axios: 'axios',
        'isomorphic-ws': 'WebSocket',
      },
      sourcemap: true,
    },
  ],
  external: ['axios', 'ws', 'isomorphic-ws'],
  watch: {
    include: 'src/**',
  },
  plugins: [
    babel(),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({
      useTsconfigDeclarationDir: true,
      objectHashIgnoreUnknownHack: true,
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // Resolve source maps to the original source
    sourceMaps(),
  ],
}
