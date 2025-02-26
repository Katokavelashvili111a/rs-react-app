import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,  // Enables globals like `vi`, `expect`, etc.
    environment: 'jsdom',  // For React testing (JS DOM environment)
  },
});

