import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'vite.config.ts',
      'src/setupTests.ts',
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: '.',
      },
      globals: {
        console: true,
        process: true,
        window: true,
        document: true,
        setTimeout: true,
        fetch: true,
        clearTimeout: true,
        addEventListener: true,
        removeEventListener: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
      'react-hooks': reactHooks,
      prettier: prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Core ESLint rules
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // TypeScript-specific rules
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ],
      '@typescript-eslint/explicit-module-boundary-types': [
        'warn',
        { allowHigherOrderFunctions: true },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],

      // Code quality rules
      'no-shadow': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/prefer-readonly': 'error',

      // React-specific rules
      'react/prop-types': 'off',
      'react/jsx-boolean-value': ['error', 'always'],
      'react/self-closing-comp': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      // Prettier integration
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'always',
        },
      ],
    },
  },
];
