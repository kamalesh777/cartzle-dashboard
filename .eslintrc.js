module.exports = {
  env: {
    browser: true,
    es2021: true
  },
//   parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    '@next/next',
    '@next/eslint-plugin-next',
    'simple-import-sort',
    'better-styled-components',
    'jest'
  ],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'standard-with-typescript',
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jsx-a11y/recommended',
    'plugin:@next/next/recommended',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'import/no-duplicates': 2,
    'import/no-unresolved': 2,
    'import/named': 2,
    semi: [2, 'never'],
    'quote-props': [2, 'as-needed'],
    'object-shorthand': [2, 'always'],
    'no-new-object': 2,
    'no-eval': 2,
    'template-curly-spacing': [2, 'never'],
    'prefer-template': 2,
    quotes: [2, 'single'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx']
      }
    ],
    'default-param-last': 2,
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always'
      }
    ],
    indent: [
      1,
      2,
      {
        SwitchCase: 1,
        ignoredNodes: [
          'TSXElement',
          'TSXElement > *',
          'TSXAttribute',
          'TSXIdentifier',
          'TSXNamespacedName',
          'TSXMemberExpression',
          'TSXSpreadAttribute',
          'TSXExpressionContainer',
          'TSXOpeningElement',
          'TSXClosingElement',
          'TSXText',
          'TSXEmptyExpression',
          'TSXSpreadChild'
        ]
      }
    ],
    'no-inline-comments': 2,
    'no-var': 2,
    'react/react-in-jsx-scope': 0,
    'react/no-danger': 0,
    'react/jsx-indent': [1, 2],
    'react/no-this-in-sfc': 2,
    'react/no-typos': 2,
    'react/no-unused-state': 2,
    'react/jsx-no-bind': [
      2,
      {
        allowArrowFunctions: true,
        allowFunctions: true
      }
    ],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-concat': 2,
    'no-useless-constructor': 2,
    'no-useless-rename': 2,
    'no-useless-return': 2,
    camelcase: [
      0,
      {
        properties: 'always',
        ignoreImports: false,
        ignoreGlobals: true,
        allow: ['org_code', 'cookies_jwtToken', 'auth_token']
      }
    ],
    'no-constant-condition': [
      2,
      {
        checkLoops: false
      }
    ],
    'no-console': [
      2,
      {
        allow: ['warn', 'error']
      }
    ],
    'eol-last': ['error', 'always'],
    'no-underscore-dangle': 0,
    'import/no-named-as-default': 0,
    'tsx-a11y/anchor-is-valid': 0,
    'react-hooks/exhaustive-deps': 0,
    '@next/next/no-img-element': 2,
    '@next/next/no-sync-scripts': 1,
    '@next/next/no-css-tags': 2,
    '@next/next/no-document-import-in-page': 2,
    '@next/next/no-html-link-for-pages': 2,
    'consistent-return': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-multi-spaces': 'error',
    'key-spacing': [2, { beforeColon: false, afterColon: true }],
    'keyword-spacing': [2, { before: true, after: true }],
    'new-cap': [2, { newIsCap: true, capIsNew: false }],
    'new-parens': 2,
    'no-array-constructor': 2
  }
}
