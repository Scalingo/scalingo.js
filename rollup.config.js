import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
  input: ["@babel/polyfill", 'src/index.js'],
  output: {
    file: 'dist/scalingo.js',
    format: 'cjs'
  },
  external: ['axios'],
  plugins: [
    multiEntry(),
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};
