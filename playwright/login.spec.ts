import { expect, test } from '@playwright/test';
import { generateTestEmail, login, register } from './auth';

test('Create an Account and login, go to dashboard page', async ({ page }) => {
  const email = generateTestEmail();
  await page.goto('/');
  await expect(page).toHaveTitle(/Ionic App/);

  // Register new account
  await register(page, email);

  // Login with created account
  await login(page, email);

  // Verify successful login
  await expect(page.getByText('Welcome Home')).toBeVisible();
});
