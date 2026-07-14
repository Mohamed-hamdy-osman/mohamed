import { test as setup } from '@playwright/test';
import { LoginPage } from '../ui/Pages/Login/loginPage';
import path from 'path';
import fs from 'fs';

export const authFile = path.join(__dirname, '../../.auth/user.json');

setup.setTimeout(60000);

setup('authenticate', async ({ page }) => {
    fs.mkdirSync(path.dirname(authFile), { recursive: true });

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        process.env.LOGIN_USERNAME ?? 'admin@zeta.com',
        process.env.LOGIN_PASSWORD ?? 'P@ssw0rd'
    );

    await loginPage.verifyLoginSuccessWithCorporate();

    await page.waitForURL(/main/, { timeout: 30000 });
    await page.waitForLoadState('load');

    await page.context().storageState({
        path: authFile,
    });
});