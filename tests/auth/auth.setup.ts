import { test as setup } from '@playwright/test';
import { LoginPage } from '../ui/Pages/Login/loginPage';
import path from 'path';
import fs from 'fs';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    // ✅ Ensure the .auth directory exists
    fs.mkdirSync(path.dirname(authFile), { recursive: true });

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        process.env.LOGIN_USERNAME ?? 'admin@zeta.com',
        process.env.LOGIN_PASSWORD ?? 'P@ssw0rd'
    );
    await loginPage.verifyLoginSuccessWithCorporate();

    // ✅ Save session AFTER confirming we're on /main
    await page.context().storageState({ path: authFile });
    console.log('✅ Auth session saved to:', authFile);
});