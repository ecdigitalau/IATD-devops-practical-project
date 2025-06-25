// eslint.config.js
import eslintPluginNode from 'eslint-plugin-node';

export default [
  {
    ignores: ['node_modules/**'],
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      node: eslintPluginNode,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'semi': ['error', 'always'],
    },
  },
];
