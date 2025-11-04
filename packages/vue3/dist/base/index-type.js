const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  extends: [
    require.resolve('./index.js'),
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // ts
    '@typescript-eslint/no-require-imports': 'off',
    // 关闭 any 校验
    '@typescript-eslint/no-explicit-any': 'off',
    // 关闭 检查代码中是否有未被使用的表达式。它要求每个表达式要么被赋值给变量，要么被用作函数调用，否则就会报错
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/ban-ts-comment': ['off', { 'ts-ignore': false }],
  }
})