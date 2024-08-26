module.exports = {
  "root": true,
  "env": { "browser": true, "es2020": true, "node": true },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:solid/typescript",
  ],
  "ignorePatterns": [
    "dist",
    ".eslintrc.cjs",
    "**/*.gen.ts",
    "*.config.js",
    "src/styled-system",
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "jsx-a11y",
    "import",
    "solid",
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { "argsIgnorePattern": "^_" },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/indent": "off",
    "import/prefer-default-export": "off",
    "no-plusplus": "off",
    "import/no-named-as-default": "off",
    "func-names": "off",
  },
}
