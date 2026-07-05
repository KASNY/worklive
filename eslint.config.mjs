import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores([
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.next/**",
    "**/.expo/**",
    "**/coverage/**",
    "**/*.min.js",
  ]),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
);
