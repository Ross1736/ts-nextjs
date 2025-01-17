import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Aplicar a todos los archivos
    rules: {
      "next/no-img-element": 0, // Usar 0 en lugar de "off"
      "@next/next/no-img-element": 0, // Agregar también esta variante
    },
  },
];

export default eslintConfig;
