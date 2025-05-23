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
      'object-curly-newline': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      'react/jsx-filename-extension': [
        'warn',
        { extensions: ['.tsx', '.jsx'] },
      ],
      'class-methods-use-this': 'off',
      'implicit-arrow-linebreak': 'off',
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
      '.next',
      '*.css',
      '*.config.js',
      '.DS_Store',
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      'node_modules/**',
      '*.generated.*',
      '*.min.js',
      '**/*.test.*',
      '**/*.spec.*',
      'src/components/ui/**',
    ],
  },
];
