import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js 기본 설정 (TypeScript, React, Next.js 포함)
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
