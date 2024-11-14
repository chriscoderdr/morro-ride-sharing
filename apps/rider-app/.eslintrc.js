module.exports = {
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier', 'unused-imports'],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        endOfLine: 'lf',
        printWidth: 80,
        proseWrap: 'never'
      }
    ],
    'no-trailing-spaces': [
      'error',
      { skipBlankLines: false, ignoreComments: false }
    ]
  }
};
