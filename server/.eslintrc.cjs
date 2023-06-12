module.exports = {
  'root': true,
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'extends': ['eslint:recommended', 'prettier'],
  'env': {
    'es2021': true,
    'node': true,
  },
  'rules': {
    indent: ['error', 2],
    'quotes': [ 'error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': 'warn',
    'comma-dangle': ['error', 'always-multiline'],
  //  "no-console": "error"
  },
};