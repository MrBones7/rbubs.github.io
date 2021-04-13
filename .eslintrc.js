module.exports = {
  parser: 'babel-eslint',
  extends: ['@rtivital/eslint-config', 'plugin:jest/recommended'],
  plugins: ['jest' 'react-hooks'],
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },

  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },

  settings: {
    'import/resolver': {
      webpack: {},
      node: {},
    },
  },
};
