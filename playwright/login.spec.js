// tests/example.spec.js
import { test, expect } from '@playwright/test';

test('Teste simples de exemplo', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Ionic App/); // Verifica se o título contém "Seu Título"
});
