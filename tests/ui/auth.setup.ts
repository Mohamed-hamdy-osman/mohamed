import { test as setup, expect } from '@playwright/test';
import path from 'path';

export const authFile = path.join(__dirname, '../../.auth/user.json');

setup.setTimeout(120000);

setup('authenticate', async ({ page }) => {
  await page.goto('https://test.actorserp.com/zeta', { waitUntil: 'domcontentloaded' });

  await page.locator('#loginName').waitFor();
  await page.locator('#loginName').fill('admin@zeta.com');
  await page.locator('#submit-button').click();

  await page.locator('#password').waitFor();
  await page.locator('#password').fill('P@ssw0rd');
  await page.locator('#submit-button').click();

  await page.waitForLoadState('networkidle');

  const corporateBtn = page.getByRole('button', { name: 'Log to Corporate' }).last();
  await expect(corporateBtn).toBeVisible();
  await Promise.all([
    page.waitForURL(/main/),
    corporateBtn.click(),
  ]);

  await page.context().storageState({ path: authFile });
});
