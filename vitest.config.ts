import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    poolOptions: {
      threads: {
        isolate: true
      },
    },
    coverage: {
      all: true,
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
  base: "/",
});
