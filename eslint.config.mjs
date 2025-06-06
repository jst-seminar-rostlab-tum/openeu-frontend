import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat for eslintrc-style configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  // Global ignores
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
      'public/**',
      '*.generated.*',
      '*.min.js',
      '**/*.test.*',
      '**/*.spec.*',
      'src/components/ui/**',
    ],
  },

  // Base ESLint recommended rules
  js.configs.recommended,

  // Next.js recommended rules with TypeScript support
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'prettier', // Must be last to disable conflicting formatting rules
  ),

  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      // Import sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // TypeScript specific overrides (handled by next/typescript)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Custom rules for better code quality
      // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-console': 'warn',

      // Allow specific naming patterns for Next.js/Supabase
      camelcase: [
        'error',
        {
          properties: 'never', // Don't check property names (allows user.app_metadata)
          ignoreDestructuring: true, // Allow const { app_metadata } = user
        },
      ],
    },
  },

  // Configuration for test files
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Configuration for config files
  {
    files: ['*.config.{js,mjs,ts}', '.*rc.{js,mjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
]);
