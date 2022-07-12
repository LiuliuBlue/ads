module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: 'off',
    'space-before-function-paren': 'off', // 函数名后可以有空格
    'vue/multi-word-component-names': 'off', // vue文件名可以是单个单词
    'no-unused-vars': 'warn' //定义了但未使用会警告
  }
}
