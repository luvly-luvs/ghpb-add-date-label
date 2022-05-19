module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  globals: {
    env: 'readonly',
  },
  ignorePatterns: ['node_modules/'],
  plugins: ['prettier'],
  overrides: [
    // TypeScript files already check for undefined vars
    // Without this override, the linter marks errors when global types are used e.g. NodeJS.Timer
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: true }],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'prettier/prettier': 'error',
    'no-unused-vars': [
      'error',
      {
        vars: 'local',
        varsIgnorePattern: '^_',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    curly: 'off',
    'no-shadow': 'off',
    'arrow-parens': [2, 'always'],
    'comma-dangle': [
      // Let Prettier take care of comma placement
      'error',
      {
        arrays: 'ignore',
        objects: 'ignore',
        imports: 'ignore',
        exports: 'ignore',
        functions: 'ignore',
      },
    ],
  },
};
