import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/login/login-page';

test.describe('Login Tests', () => {

    //test('Valid Login Test', async ({ page }) => {
     //   await page.goto('https://test.actorserp.com/zeta/main/corporates');
     //   await expect(page).toHaveURL(/main/);
    //});

  test('Valid Login with Corporate Test', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('admin@zeta.com', 'P@ssw0rd');
    await loginPage.verifyLoginSuccessWithCorporate();

    await expect(page).toHaveURL(/main/);
    await expect(page.locator('tbody tr').first()).toBeVisible({
        timeout: 30000,
    });
});

    test('Invalid Login Test', async ({ browser }) => {
        const context = await browser.newContext({
            storageState: undefined,
        });

        const page = await context.newPage();
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('admin@zeta.com', 'P@ssw0rd?');
        await loginPage.verifyLoginFailure();

        await context.close();
    });

});