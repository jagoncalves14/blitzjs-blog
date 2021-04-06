module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: [
    "blitz",
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
    "plugin:security/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["react", "simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-abusive-eslint-disable": "off",
    "unicorn/no-null": "off",
    "no-undef": "off",
    "unicorn/filename-case": [
      "warn",
      {
        cases: {
          pascalCase: true,
          camelCase: true,
          kebabCase: true,
        },
      },
    ],
  },
}
