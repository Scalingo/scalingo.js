module.exports = {
  env: {
    es6: true,
    mocha: true,
    node: true,
  },
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-extra-semi': 'off',
    '@typescript-eslint/camelcase': 'warn',
    '@typescript-eslint/no-use-before-define': 'warn',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
}
