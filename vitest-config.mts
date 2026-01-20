import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.ts?(x)"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
        perFile: true
      }
    }
  }
});
