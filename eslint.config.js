import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['dist', 'node_modules', 'build'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      // React 17+ JSX transform
      'react/react-in-jsx-scope': 'off',

      // Useful dev rules
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn'],

      // Let Prettier handle formatting
      ...prettier.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
