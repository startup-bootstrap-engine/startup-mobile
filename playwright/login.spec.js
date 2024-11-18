import { test, expect } from '@playwright/test';

test('Teste simples de exemplo', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Ionic App/);
});
