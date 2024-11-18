// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright', // Diretório onde os testes estarão
  timeout: 30000, // Timeout de 30 segundos por teste
  use: {
    headless: false, // Defina como true se preferir headless
    baseURL: 'http://localhost:8100', // URL do backend
  },
});
