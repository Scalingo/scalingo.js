module.exports = {
  env: {
    es6: true,
    mocha: true,
    node: true
  },
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    'no-extra-semi': 'off',
    '@typescript-eslint/camelcase': 'warn',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  }
}
