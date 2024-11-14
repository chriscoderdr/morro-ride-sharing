module.exports = {
  extends: [],
  plugins: ['prettier'],
  rules: {
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
