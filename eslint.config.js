import importNewLinesPlugin from "eslint-plugin-import-newlines";
import parserTs from "@typescript-eslint/parser";
import stylistic from "@stylistic/eslint-plugin";
import tsEslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  { ignores: ["build/"] },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: parserTs,
    },
  },
  stylistic.configs.customize({
    semi: true,
    quotes: "double",
  }),
  {
    plugins: {
      "import-newlines": importNewLinesPlugin,
      "unused-imports": unusedImports,
      "@typescript-eslint": tsEslint,
    },
    rules: {
      "import-newlines/enforce": ["error", 2],
      "unused-imports/no-unused-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
