// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright',
  timeout: 30000,
  use: {
    headless: false,
    baseURL: 'http://localhost:8100',
  },
});
