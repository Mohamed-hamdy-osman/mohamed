import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/Login/loginPage';

test.describe('Login Tests', () => {

    // ✅ Uses stored session from auth.setup — just navigates directly
    test('Valid Login Test', async ({ page }) => {
        await page.goto('https://test.actorserp.com/zeta/main/corporates');
        await expect(page).toHaveURL(/main/, { timeout: 15000 });
    });

    // ✅ Uses stored session — verifies page content loads
    test('Valid Login with Corporate Test', async ({ page }) => {
        await page.goto('https://test.actorserp.com/zeta/main/corporates');
        await expect(page).toHaveURL(/main/, { timeout: 15000 });
        await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 15000 });
    });

    // ✅ Fresh context — no stored session, tests wrong password
    test('Invalid Login Test', async ({ browser }) => {
        const context = await browser.newContext({ storageState: undefined });
        const page = await context.newPage();
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(
            process.env.LOGIN_USERNAME ?? 'admin@zeta.com',
            'WrongPassword123' // ✅ Use a known wrong password, not the real one
        );
        await loginPage.verifyLoginFailure();

        await context.close();
    });

});