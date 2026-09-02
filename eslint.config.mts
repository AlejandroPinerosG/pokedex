import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
  },
  {
    languageOptions: {
      globals: globals.browser,
      sourceType: 'module',
    },
  },
  // TypeScript files
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.eslint.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          args: 'after-used',
        },
      ],
    },
  },
  pluginJs.configs.recommended,
  {
    files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
    env: {
      jest: true,
    },
  },
  ...pluginVue.configs['flat/essential'],
  eslintConfigPrettier,
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.object.name='console'][callee.property.name='log']",
          message: 'console.log is not allowed. Use a proper logging library instead.',
        },
        {
          selector:
            "CallExpression[callee.object.name='console'][callee.property.name='info']",
          message: 'console.info is not allowed. Use a proper logging library instead.',
        },
        {
          selector:
            "MemberExpression[object.callee.property.name='filter'][property.name='0']",
          message: 'Prefer .find() over .filter()[0] for better performance and readability.',
        },
        {
          selector:
            "CallExpression[callee.object.name='Promise'][callee.property.name='reject'][arguments.0.type='Literal']",
          message: 'Promise rejection reason must be an Error object, not a literal.',
        },
        {
          selector: "CallExpression[callee.name='isNaN']",
          message: 'Prefer Number.isNaN() over global isNaN().',
        },
        {
          selector: "CallExpression[callee.name='parseFloat']",
          message: 'Prefer Number.parseFloat() over global parseFloat().',
        },
        {
          selector:
            "ThrowStatement > NewExpression[callee.name='Error'] ~ IfStatement:has(> BinaryExpression[operator='===' | operator='==' | operator='!==' | operator='!='] UnaryExpression[operator='typeof'])",
          message: 'Use TypeError instead of Error for type validation failures.',
        },
      ],
      'no-debugger': 'warn',
      'max-len': [
        2,
        {
          code: 90,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreUrls: true,
          ignorePattern: 'd="([\\s\\S]*?)"',
        },
      ],
      'vue/multi-word-component-names': 'off',
      'no-undef': 'warn',
      'no-useless-escape': 'warn',
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'off',
    },
  },
]
