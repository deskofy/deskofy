import { fixupPluginRules } from '@eslint/compat';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import parserTypescript from '@typescript-eslint/parser';
import { ESLint } from 'eslint';
import tseslint from 'typescript-eslint';

/** @type {ESLint.ConfigData} */
export default [
  {
    ignores: [
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
      '**/build/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/out/**',
      '**/public/**',
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    files: ['**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
  },
  {
    linterOptions: {
      // Set to "off" to suppress warnings about unused eslint-disable
      // directives. This is useful when different environments (e.g., MacOS
      // vs Ubuntu) produce inconsistent fucking linting results.
      reportUnusedDisableDirectives: 'off',
    },
  },
  {
    name: 'ESLint Config - Electron JS',
    languageOptions: {
      parser: parserTypescript,
      parserOptions: {
        ecmaVersion: 'ES2023',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTypescript,
    },
    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      'consistent-return': 'off',
      'max-params': 'off',
      'no-await-in-loop': 'error',
      'no-dupe-else-if': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-func-assign': 'error',
      'no-import-assign': 'error',
      'no-self-assign': 'error',
      'no-unassigned-vars': 'error',
      'no-unexpected-multiline': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unreachable-loop': 'error',
      'no-unreachable': 'error',
      'no-unused-expressions': 'off',
      'no-unused-labels': 'error',
      'no-use-before-define': 'off',
      'prefer-destructuring': 'off',
      'valid-typeof': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-generic-constructors': [
        'error',
        'constructor',
      ],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/consistent-return': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/max-params': [
        'error',
        { countVoidThis: false, max: 12 },
      ],
      '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-enum-comparison': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-use-before-define': ['error', { enums: true }],
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-destructuring': [
        'error',
        { object: true },
        { enforceForDeclarationWithTypeAnnotation: true },
      ],
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/promise-function-async': 'error',
    },
  },
];
