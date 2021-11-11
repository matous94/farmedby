// common linting rules for JS, TS and cypress files

module.exports = {
  rules: {
    "linebreak-style": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ],
    "no-unused-vars": "warn",
    "import/prefer-default-export": "off",
    "no-unreachable": "warn",
    "arrow-body-style": "off",
    "react/jsx-boolean-value": "off",
    "react/no-array-index-key": "off",
    "prefer-arrow-callback": "off",
    "react/jsx-no-bind": [
      "error",
      {
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: true,
        allowBind: false,
        ignoreDOMComponents: true
      }
    ]
  }
};
