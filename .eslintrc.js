module.exports = {
  parser: "@typescript-eslint/parser",
  // parserOption: {
  //   ecmaVersion: 6,
  //   project: ["./tsconfig.json"],
  //   sourceType: "module",
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  // },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
};
