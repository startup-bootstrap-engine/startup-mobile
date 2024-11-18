import { expect, test } from '@playwright/test';

function generateEmail() {
  const randomString = Math.random().toString(36).substring(2, 12); // Gera uma string aleatória de 10 caracteres
  return `${randomString}@gmail.com`;
}

test('Create an Account and login, go to dashboard page', async ({ page }) => {
  const email = generateEmail();
  await page.goto('/');
  await expect(page).toHaveTitle(/Ionic App/);
  const registerButton = await page.getByRole('button', {
    name: "Don't have an account? Sign",
  });
  await registerButton.click();
  await expect(page).toHaveTitle(/Ionic App/);
  const fullNameInput = await page.getByLabel('Full name');
  await fullNameInput.fill('Teste');
  await fullNameInput.press('Tab');
  const emailInput = await page.getByLabel('Email address');
  await emailInput.fill(email);
  await emailInput.press('Tab');
  const passwordInput = await page.getByLabel('Password', { exact: true });
  await passwordInput.fill('12345678910');
  await passwordInput.press('Tab');
  const passwordInput2 = await page.getByLabel('Confirm password');
  await passwordInput2.fill('12345678910');
  await passwordInput2.press('Tab');
  const createAccountButton = await page.getByRole('button', {
    name: 'Create Account',
  });
  await createAccountButton.click();
  await page.waitForTimeout(5000);
  await emailInput.fill(email);
  await emailInput.getByText(email);
  await passwordInput.fill('12345678910');
  const loginButton = await page.getByRole('button', { name: 'Sign In' });
  await loginButton.click();

  await expect(page.getByText('Welcome Home')).toBeVisible();
});
