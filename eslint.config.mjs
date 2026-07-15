import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// eslint-config-next 16 ships flat config arrays, so they are spread straight
// in — no @eslint/eslintrc FlatCompat wrapper (which ESLint 10 chokes on).
// ESLint itself is pinned to 9: on 10, eslint-plugin-react (vendored inside
// eslint-config-next) dies in getFilename before linting a single file.
const config = [
  {
    ignores: ["src/generated/**", ".next/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // A leading underscore marks a binding that exists for its position, not
      // its value — e.g. the `_prev` state argument every useActionState
      // action must declare.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Warn, not error. The three current hits (ThemeContext, Header,
      // CurrencyTicker) all read state that only exists on the client — the
      // theme class the no-flash script put on <html>, the scroll position, a
      // localStorage cache. Seeding useState from those during render is what
      // the rule steers you towards, and it would desync hydration, because
      // the server has none of them. The mount-then-setState hop is the point.
      // Keep it visible so genuinely careless cases still surface in review.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;
