const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  env: {
    es6: true,
    // 浏览器环境
    browser: true,
    // node环境
    node: true
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    // import 和 export 语法检查(eslint-plugin-import)
    'plugin:import/recommended',
    // 管理和规范 ESLint 指令注释如 //eslint-disable-line、/* eslint-disable */ 等(eslint-plugin-eslint-comments)
    'plugin:eslint-comments/recommended',
    // markdown 文件中检查代码块的语法和风格
    'plugin:markdown/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs', '.ts', '.d.ts', '.tsx'] },
    },
  },
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
    },

    {
      files: ['**/*.md/*.js', '**/*.md/*.ts'],
      rules: {
        'no-console': 'off',
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  rules: {
    // js/ts
    'no-console': ['warn', { allow: ['error'] }],
    'no-debugger': 'warn',

    // ts
    '@typescript-eslint/no-require-imports': 'off',
    // 关闭 any 校验
    '@typescript-eslint/no-explicit-any': 'off',
    // 关闭 检查代码中是否有未被使用的表达式。它要求每个表达式要么被赋值给变量，要么被用作函数调用，否则就会报错
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/ban-ts-comment': ['off', { 'ts-ignore': false }],

    // vue
    'vue/multi-word-component-names': 'off',

    // import
    'import/no-unresolved': 'off',
    // 关闭模块的命名导入与导出的名称完全匹配校验
    'import/named': 'off',
    'import/no-named-as-default': 'off',
  }
})