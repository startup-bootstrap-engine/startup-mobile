import { Page } from '@playwright/test';
import { TEST_SELECTORS } from './test.selectors';

export function generateTestEmail() {
  const randomString = Math.random().toString(36).substring(2, 12);
  return `${randomString}@gmail.com`;
}

export async function register(
  page: Page,
  email: string,
  password: string = '12345678910',
) {
  const registerButton = await page.getByRole(
    TEST_SELECTORS.REGISTER_BUTTON.role,
    { name: TEST_SELECTORS.REGISTER_BUTTON.name },
  );
  await registerButton.click();

  const fullNameInput = await page.getByLabel(
    TEST_SELECTORS.FULL_NAME_INPUT.label,
  );
  await fullNameInput.fill('Teste');
  await fullNameInput.press('Tab');

  const emailInput = await page.getByLabel(TEST_SELECTORS.EMAIL_INPUT.label);
  await emailInput.fill(email);
  await emailInput.press('Tab');

  const passwordInput = await page.getByLabel(
    TEST_SELECTORS.PASSWORD_INPUT.label,
    { exact: TEST_SELECTORS.PASSWORD_INPUT.exact },
  );
  await passwordInput.fill(password);
  await passwordInput.press('Tab');

  const passwordInput2 = await page.getByLabel(
    TEST_SELECTORS.CONFIRM_PASSWORD_INPUT.label,
  );
  await passwordInput2.fill(password);
  await passwordInput2.press('Tab');

  const createAccountButton = await page.getByRole(
    TEST_SELECTORS.CREATE_ACCOUNT_BUTTON.role,
    { name: TEST_SELECTORS.CREATE_ACCOUNT_BUTTON.name },
  );
  await createAccountButton.click();

  await page.waitForTimeout(5000);
}

export async function login(
  page: Page,
  email: string,
  password: string = '12345678910',
) {
  const emailInput = await page.getByLabel(TEST_SELECTORS.EMAIL_INPUT.label);
  await emailInput.fill(email);

  const passwordInput = await page.getByLabel(
    TEST_SELECTORS.PASSWORD_INPUT.label,
    { exact: TEST_SELECTORS.PASSWORD_INPUT.exact },
  );
  await passwordInput.fill(password);

  const loginButton = await page.getByRole(TEST_SELECTORS.LOGIN_BUTTON.role, {
    name: TEST_SELECTORS.LOGIN_BUTTON.name,
  });
  await loginButton.click();
}
