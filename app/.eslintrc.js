/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'no-multi-spaces': ['error'],
    'no-trailing-spaces': ['error', { 'skipBlankLines': false }],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
    'no-extra-semi': ['error'],
    semi: ['error', 'never'],
  },
}
