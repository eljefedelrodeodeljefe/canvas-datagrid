
module.exports = {
  root: true,
  env: {
    node: true,
    // 'cypress/globals': true,
    jest: true
  },
  extends: [
    'standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-only-tests/no-only-tests': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: [
    // 'cypress',
    'no-only-tests'
  ]
}
