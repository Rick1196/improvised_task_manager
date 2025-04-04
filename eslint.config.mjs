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
    name: "custom-rules",
    rules: {
      "no-use-client-in-app": noUseClientInAppRule,
    },
  },

  // Enable the custom rule with a warning
  {
    rules: {
      "no-use-client-in-app": "warn",
    },
  },
];

export default eslintConfig;
