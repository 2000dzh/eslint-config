const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  env: {
    es6: true,
    // 浏览器环境
    browser: true,
    // node环境
    node: true
  },
  extends: [
    'eslint:recommended',
    // import 和 export 语法检查(eslint-plugin-import)
    'plugin:import/recommended',
    // 管理和规范 ESLint 指令注释如 //eslint-disable-line、/* eslint-disable */ 等(eslint-plugin-eslint-comments)
    'plugin:eslint-comments/recommended',
    'plugin:vue/recommended'
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs', '.ts', '.d.ts', '.tsx'] },
    },
  },
  rules: {
    // js
    'no-console': ['warn', { allow: ['error'] }],
    'no-debugger': 'warn',

    // import
    'import/no-unresolved': 'off',
    // 关闭模块的命名导入与导出的名称完全匹配校验
    'import/named': 'off',
    'import/no-named-as-default': 'off',
  }
})