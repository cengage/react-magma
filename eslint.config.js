const js = require("@eslint/js");
const globals = require("globals");
const eslintPluginImport = require("eslint-plugin-import");
const eslintPluginReact = require("eslint-plugin-react");
const eslintPluginJsxA11y = require("eslint-plugin-jsx-a11y");
const eslintPluginReactHooks = require("eslint-plugin-react-hooks");
const eslintPluginPrettier = require("eslint-plugin-prettier");
const eslintConfigPrettier = require("eslint-config-prettier");
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
    // 1. Global ignores
    {
        ignores: [
            ".storybook/**",
            "dist/**",
            "node_modules/**",
            "coverage/**",
            "public/**",
            ".cache/**",
            "**/CHANGELOG.md",
            "esm/**", "lib/**", "tmp/**",
            "**/*.stories.**",
            "**/reports/**", "**/.eslintrc.js", "eslint.config.js", // ignore self
            "**/plugins/**", "**/static/**", "**/__snapshots__/**", ".nx/**",
            "**/*.d.ts",
            "**/*.test.js",
        ]
    },
    // 2. Base JavaScript recommended settings
    js.configs.recommended,
    // 3. TypeScript configurations using tseslint.configs
    ...tseslint.configs.recommended,
    // 4. React, JSX-A11y, React-Hooks configurations
    {
        files: ["**/*.{jsx,tsx}"],
        plugins: {
            'react': eslintPluginReact,
            'react-hooks': eslintPluginReactHooks,
            'jsx-a11y': eslintPluginJsxA11y,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        rules: {
            ...(eslintPluginReactHooks.configs.recommended ? eslintPluginReactHooks.configs.recommended.rules : {}),
            ...(eslintPluginJsxA11y.configs.recommended ? eslintPluginJsxA11y.configs.recommended.rules : {}),
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/display-name": "off",
            "react/no-unescaped-entities": "off",
            "jsx-a11y/no-autofocus": "off",
            'jsx-a11y/aria-props': 'error',
            'jsx-a11y/aria-proptypes': 'error',
            'jsx-a11y/aria-role': 'error',
            'jsx-a11y/aria-unsupported-elements': 'error',
            'jsx-a11y/alt-text': 'error',
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    },

    // 5. Import plugin configuration
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            'import': eslintPluginImport,
        },
        rules: {
            'import/no-duplicates': 'error',
            'import/newline-after-import': 'error',
            "import/order": [
                'error',
                {
                    groups: [
                        ['builtin', 'external'],
                        'internal',
                        ['parent', 'sibling'],
                        'index',
                    ],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
        },
        settings: {
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project: "./tsconfig.json"
                },
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".mjs", ".cjs"]
                }
            }
        }
    },
    // 6. Project-specific rules and overrides (applied globally after presets)
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
        },
        rules: {
            "no-empty": "off",
            "no-prototype-builtins": "off",
            "no-useless-escape": "off",
            "no-case-declarations": "off",
            "no-undef": "off",
            "complexity": "off",
            "default-case": "warn",
            "eqeqeq": "warn",
            "max-lines-per-function": "off",
            "no-empty-function": "warn",
            "no-eval": "error",
            "no-multi-str": "error",
            "no-param-reassign": "warn",
            "no-return-assign": "error",
            "no-self-compare": "error",
            "no-throw-literal": "error",
            "no-void": "error",
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-nested-ternary": "warn",
            "prefer-promise-reject-errors": "error",
            "radix": "warn",
            "require-await": "warn",
            "padding-line-between-statements": [
            "warn",
            { blankLine: "always", prev: "*", next: "return" },
            { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
            { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
            { blankLine: "always", prev: "directive", next: "*" },
            { blankLine: "any", prev: "directive", next: "directive" }
            ],
            "no-irregular-whitespace": "warn",
            "no-constant-binary-expression": "off",
            "prefer-const": "warn",
            "prefer-spread": "warn",
            "@typescript-eslint/no-this-alias": "warn",
            "no-shadow": "warn",
            "@typescript-eslint/no-shadow": "warn",
            "no-use-before-define": "warn",
            "@typescript-eslint/no-use-before-define": "warn",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }], // Old config: "warn"
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/ban-ts-comment": ["warn", { "ts-expect-error": "allow-with-description" }],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-unused-expressions": "warn",
            "@typescript-eslint/no-empty-object-type": "warn",
        }
    },
    // 7. Prettier configuration (should be last to override other styling rules)
    {
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...eslintConfigPrettier.rules,
            "prettier/prettier": "warn",
        },
    },
);
