module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["**/*.js", "**/*.json"],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:cypress/recommended",
    "../eslint-common.js"
  ],
  plugins: ["react", "react-hooks", "@typescript-eslint", "cypress"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./cypress/tsconfig.json"
    // we can also set project to "./tsconfig.json" and use tsconfigRootDir
    // tsconfigRootDir: __dirname
  },
  rules: {
    // typescript specific
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-expressions": "off"
  }
};
