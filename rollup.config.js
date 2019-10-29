import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import polyfill from 'rollup-plugin-polyfill'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/scalingo.js',
    format: 'umd',
    name: 'scalingo',
  },
  external: ['axios', 'ws', 'isomorphic-ws'],
  plugins: [
    polyfill('src/index.js', ['@babel/polyfill']),
    resolve(),
    commonjs(),
    json(),
    babel(),
  ],
}
