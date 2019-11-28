import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/scalingo.js',
    format: 'umd',
    globals: {
      axios: 'axios',
      'isomorphic-ws': 'WebSocket',
    },
    name: 'scalingo',
  },
  external: ['axios', 'ws', 'isomorphic-ws'],
  plugins: [resolve(), babel(), commonjs()],
}
