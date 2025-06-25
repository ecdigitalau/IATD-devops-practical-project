// eslint.config.js
// import eslintPluginNode from 'eslint-plugin-node';

// export default [
//   {
//     ignores: ['node_modules/**'],
//     files: ['**/*.js'],
//     languageOptions: {
//       ecmaVersion: 2022,
//       sourceType: 'module',
//     },
//     plugins: {
//       node: eslintPluginNode,
//     },
//     rules: {
//       'no-unused-vars': 'warn',
//       'no-undef': 'error',
//       'semi': ['error', 'always'],
//     },
//   },
// ];

// eslint.config.js
import eslintPluginNode from 'eslint-plugin-node';
import { defineConfig } from 'eslint/config';

export default defineConfig([
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
    // If you want to use the plugin's recommended config:
    extends: [eslintPluginNode.configs.recommended],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'semi': ['error', 'always'],
      // You can add plugin rules like:
      // 'node/no-unsupported-features/es-syntax': 'error',
    },
  },
]);
