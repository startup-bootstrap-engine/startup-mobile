// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright',
  timeout: 30000,
  use: {
    headless: true,
    baseURL: 'http://localhost:8100',
  },
  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:8100',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
