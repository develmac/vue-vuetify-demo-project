/// <reference types="vitest" />

import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import { resolve } from "path"

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    setupFiles: "vuetify.test.config.js",
    deps: {
      inline: ["vuetify"],
    },
    environment: "happy-dom",
    coverage: {
      reporter: ["lcov", "html", "text"],
      reportsDirectory: "test/coverage",
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@test": resolve(__dirname, "test"),
    },
  },
})
