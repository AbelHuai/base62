module.exports = {
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   project: 'tsconfig.json',
  //   tsconfigRootDir: 'packages/nix'
  // },
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.ts'
        ]
      }
    }
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/interface-name-prefix': ['error', 'always'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'import/prefer-default-export': ['off'],
    'linebreak-style': ['off', 'error', 'windows'],
    'max-len': ['error', 200],
    'no-console': ['off'],
    "no-constant-condition": ["off"]
  }
};
