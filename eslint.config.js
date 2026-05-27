import path from "node:path";
import { fileURLToPath } from "node:url";

import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
    globalIgnores(["dist/", "build/", "coverage/", "node_modules/", "**/*.d.ts", "**/*.min.*"]),

    eslint.configs.recommended,

    {
        name: "app/base",
        files: ["**/*.{js,mjs,cjs,ts,tsx}"],

        plugins: {
            "simple-import-sort": simpleImportSort,
        },

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                SomeGlobalVariable: "readonly",
            },
        },

        linterOptions: {
            reportUnusedDisableDirectives: "error",
            reportUnusedInlineConfigs: "error",
        },

        rules: {
            curly: ["error", "all"],
            eqeqeq: ["error", "always", { null: "ignore" }],
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-implicit-coercion": "error",
            "no-return-await": "error",
            "no-var": "error",
            "object-shorthand": "error",
            "prefer-const": "error",
            "prefer-template": "error",

            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        ["^\\u0000"],
                        ["^node:"],
                        ["^@?\\w"],
                        ["^@/"],
                        ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                        ["^.+\\.s?css$"],
                    ],
                },
            ],
            "simple-import-sort/exports": "error",
            "sort-imports": "off",
        },
    },

    {
        name: "app/typescript",
        files: ["**/*.{ts,tsx}"],

        extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],

        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir,
            },
        },

        rules: {
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    prefer: "type-imports",
                    fixStyle: "separate-type-imports",
                },
            ],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-non-null-assertion": "warn",
            "@typescript-eslint/no-misused-promises": "warn",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-floating-promises": "warn",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/restrict-template-expressions": [
                "error",
                {
                    allowBoolean: true,
                    allowNullish: true,
                    allowNumber: true,
                },
            ],
        },
    },

    {
        name: "app/javascript",
        files: ["**/*.{js,mjs,cjs}"],
        extends: [tseslint.configs.disableTypeChecked],
    },

    {
        name: "app/commonjs",
        files: ["**/*.cjs"],
        languageOptions: {
            sourceType: "commonjs",
            globals: {
                ...globals.node,
            },
        },
    },

    {
        name: "app/node-config-files",
        files: [
            "eslint.config.{js,mjs,cjs}",
            "*.{config,setup}.{js,mjs,cjs,ts,mts,cts}",
            "scripts/**/*.{js,mjs,cjs,ts,mts,cts}",
        ],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        rules: {
            "no-console": "off",
        },
    },

    {
        name: "app/tests",
        files: ["**/*.{spec,test}.{ts,tsx,js,mjs,cjs}"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
        },
    },

    prettierRecommended,
]);
