import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    'node_modules',
    'src_BACKUP_BEFORE_FINAL_BRAND_CLEANUP_20260703_0651',
    'src_BACKUP_BEFORE_FINAL_BRAND_CLEANUP_20260703_0651/**',
    'ZIP_RESTORE_REVIEW',
    'ZIP_RESTORE_REVIEW/**',
  ]),
  {
    files: ['src/**/*.{js,jsx}', '*.config.js'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^(React|announcement)$',
        argsIgnorePattern: '^_',
      }],
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
