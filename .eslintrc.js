export default {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['plugin:react/recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': import.meta.env.MODE === 'production' ? 'warn' : 'off',
    'no-debugger': import.meta.env.MODE === 'production' ? 'warn' : 'off',
  },
};
