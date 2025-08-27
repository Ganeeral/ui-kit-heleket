module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'dist',
    '.next',
    '.husky',
    '.eslintrc.js',
    'src/**/*.spec.cy.ts',
    'cypress',
    'next.config.mjs',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'react-refresh',
    'unused-imports',
    // "dirs",
    'sort-keys-fix',
    'typescript-sort-keys',
    'unicorn',
    // "simple-import-sort"
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
    'plugin:import/recommended',
    'plugin:unicorn/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended',
    'prettier',
    // "@feature-sliced" // -> think about it
  ],
  rules: {
    // Disabled Rules
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/display-name': 'off',
    'valid-jsdoc': 'off',
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/prefer-event-target': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'unicorn/explicit-length-check': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prefer-string-replace-all': 'off',
    // Warnings
    '@typescript-eslint/padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: '*',
        next: ['interface', 'type'],
      },
    ],
    'no-console': 'warn',
    // Enabled Rules
    'object-shorthand': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        noSortAlphabetically: true,
        callbacksLast: true,
        ignoreCase: true,
        shorthandFirst: true,
        reservedFirst: true,
        multiline: 'last',
      },
    ],
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'multiline-block-like',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'return',
          'throw',
          'try',
          'while',
          'do',
          'if',
          'switch',
          'function',
          'for',
          'multiline-const',
        ],
      },
      {
        blankLine: 'always',
        prev: 'multiline-const',
        next: '*',
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    semi: ['error', 'always'],
    'no-mixed-requires': 'error',
    'sort-keys-fix/sort-keys-fix': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'unicorn/filename-case': 'off',
    // "dirs/dirnames": [
    //   2,
    //   {
    //     pattern: "^[a-zA-Z0-9-_\\[\\]]+$",
    //   },
    // ],
    'typescript-sort-keys/interface': [
      'error',
      'asc',
      {
        caseSensitive: true,
        natural: false,
        requiredFirst: true,
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/no-array-index-key': 'error', // don't use index as key of list item
    '@typescript-eslint/no-use-before-define': 'error',
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ], // -> use only strict eq
    'react/no-did-update-set-state': 'error', // -> don't need to call setState in componentDidUpdate lifecycle method
    'react/no-direct-mutation-state': 'error', // -> don't need to mutate state directly, use setState instead
    'react/no-unused-state': 'error',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'prettier/prettier': [
      'error',
      {
        jsxSingleQuote: true,
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 100,
        bracketSameLine: false,
        useTabs: false,
        arrowParens: 'always',
        endOfLine: 'auto',
      },
    ],
    'jsx-a11y/no-noninteractive-tabindex': 0,
    'react/jsx-boolean-value': 'error', // don't need to set {true} value for boolean prop, name is enough
    'max-len': [
      'error',
      {
        code: 100,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    '@next/next/no-img-element': 'off',
  },
};
