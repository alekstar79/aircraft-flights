module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    sourceType: "module"
  },
  rules: {
  },
  globals: {
    defineProps: true,
    defineEmits: true,
    fabric: true
  }
}
