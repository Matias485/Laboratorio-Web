import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // En este laboratorio usamos <img> a propósito: los ejemplos son los
      // mismos que los de las diapositivas y de la documentación de React, que
      // no usan el componente <Image> de Next.js.
      "@next/next/no-img-element": "off",
      // Varias lecciones muestran a propósito código "incorrecto" para después
      // explicar por qué lo es (por ejemplo, entidades sin escapar en JSX).
      "react/no-unescaped-entities": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
