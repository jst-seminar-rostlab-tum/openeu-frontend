import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('next'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:prettier/recommended'),
  ...compat.extends('airbnb'),

  {
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'prettier/prettier': 'error',
      'no-nested-ternary': 'warn',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-no-bind': 'off',
      'import/prefer-default-export': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      'react/jsx-filename-extension': [
        'warn',
        { extensions: ['.tsx', '.jsx'] },
      ],
      'class-methods-use-this': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'warn',
          tsx: 'never',
        },
      ],
      camelcase: [
        'error',
        {
          allow: ['Geist_Mono'],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
        alias: {
          map: [['@', './src/']],
          extensions: ['.ts', '.tsx', ''],
        },
      },
    },
    plugins: {
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSortPlugin,
    },
  },
  {
    ignores: [
      'node_modules',
      '.next',
      'dist',
      'build',
      '*.css',
      '*.config.js',
      '.DS_Store',
    ],
  },
];
