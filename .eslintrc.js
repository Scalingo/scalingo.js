module.exports = {
  env: {
    es6: true,
    mocha: true,
    node: true,
  },
  extends: ['prettier', 'plugin:prettier/recommended', 'eslint:recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    'no-extra-semi': 'off',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
}
