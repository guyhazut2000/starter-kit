import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "app/__tests__/**/*.{test,spec}.{ts,tsx,js,jsx}",
      "lib/__tests__/**/*.{test,spec}.{ts,tsx,js,jsx}",
      "**/?(*.)+(spec|test).[jt]s?(x)",
    ],
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      reporter: ["text", "lcov"],
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70,
      exclude: [
        "**/*.d.ts",
        "**/node_modules/**",
        ".next/**",
        "coverage/**",
        "**/*.config.{js,ts,mjs,cts}",
        "vitest.setup.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
