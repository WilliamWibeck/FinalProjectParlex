import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Use jsdom for testing React components
    globals: true, // Allow global test functions (e.g., `describe`, `it`)
  },
});
