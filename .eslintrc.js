module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  rules: {
    'no-plusplus': 0,
    'no-mixed-operators': 0,
    'no-nested-ternary': 0,
    'arrow-body-style': 0,
    'no-use-before-define': 0,

    'react/no-multi-comp': 0,
    'react/jsx-filename-extension': 'off', // https://github.com/zeit/next.js/issues/200
    'react/prefer-stateless-function': 0,
    'react/no-unused-prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/prop-types': 0,
    'react/no-array-index-key': 0,

    'import/prefer-default-export': 0,
    'import/first': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    'jsx-a11y/no-static-element-interactions': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ],
    "no-underscore-dangle": 0,
    "no-shadow": 0
  },
  plugins: ['prettier'],
  globals: {
    require: false,
    process: false,
    browser: false,
    window: true,
    document: true,
    FileReader: true
  },
};
