import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import _import from "eslint-plugin-import";
import solid from "eslint-plugin-solid";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/dist",
        "**/.eslintrc.cjs",
        "**/*.gen.ts",
        "**/*.config.js",
        "src/styled-system",
    ],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:solid/typescript",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        "jsx-a11y": jsxA11Y,
        import: fixupPluginRules(_import),
        solid,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
    },

    rules: {
        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
        }],

        "no-unused-vars": "off",
        "@typescript-eslint/prefer-interface": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/indent": "off",
        "import/prefer-default-export": "off",
        "no-plusplus": "off",
        "import/no-named-as-default": "off",
        "func-names": "off",
    },
}];