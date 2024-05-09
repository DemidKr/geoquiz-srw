import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    "extends": [
      "prettier"
    ],
    "rules": {
      '@typescript-eslint/no-unused-vars': 'warn',

      'react/react-in-jsx-scope': 'off',

      // TODO: remove after refactor
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      'prefer-spread': 'warn'
    }
  }
];