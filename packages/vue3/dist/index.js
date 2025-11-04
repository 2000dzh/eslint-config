const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  extends: [
    require.resolve('./base/index-type.js'),
    'plugin:vue/vue3-recommended'
  ],
  overrides: [
    // 针对 .vue 文件，使用 vue-eslint-parser 作为解析器
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        // 关闭 no-undef 规则，避免因 Vue 特定的全局变量导致的误报
        'no-undef': 'off',
        // 启用 @typescript-eslint/consistent-type-imports 规则，确保类型导入的一致性
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { disallowTypeAnnotations: false },
        ],
      },
    }
  ],
  rules: {
    // vue
    'vue/multi-word-component-names': 'off'
  }
})