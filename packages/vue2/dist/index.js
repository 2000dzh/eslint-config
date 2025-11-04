const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  extends: [
    require.resolve('./base/index.js'),
    'plugin:vue/recommended'
  ]
})