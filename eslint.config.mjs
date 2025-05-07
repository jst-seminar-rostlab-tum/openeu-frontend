import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      '.now/*',
      '*.css',
      '.changeset',
      'dist',
      'esm/*',
      'public/*',
      'tests/*',
      'scripts/*',
      '*.config.js',
      '.DS_Store',
      'node_modules',
      'coverage',
      '.next',
      'build',

      // EXCEPTIONS (negated ignores not supported in ESLint 9+ directly)
      // You must explicitly include those files if needed in tooling/tests
    ],
  },
];

export default eslintConfig;
