const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  extends: [
    require.resolve('eslint-config-dzh-base/index-type.js'),
    'plugin:vue/recommended'
  ]
})