import { test as setup } from '@playwright/test';
import { LoginPage } from './Pages/login/loginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();

  // Ensure dashboard is fully loaded and session tokens are completely saved
  await page.getByText('Human Resources').first().waitFor({ state: 'visible', timeout: 30000 });
  await page.waitForTimeout(2000); // Safe settle timeout

  // Save the browser's storage state (cookies, localStorage, etc.)
  await page.context().storageState({ path: authFile });
});
