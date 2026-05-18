import { test } from '@playwright/test';
import { LoginPage } from './tests/Pages/login/loginPage';
import { ManageEmployeesPage } from './tests/Pages/HR-Module/Personal/Employees/manageEmployees';

test('debug dropdown', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const manageEmployeesPage = new ManageEmployeesPage(page);

    await loginPage.goto();
    await loginPage.login('admin@zeta.com', 'P@ssw0rd');
    await loginPage.verifyLoginSuccessWithCorporate();
    await manageEmployeesPage.navigateToEmployees();

    if (!await manageEmployeesPage.search_btn.isVisible()) {
        await manageEmployeesPage.filterChevron.click();
        await manageEmployeesPage.search_btn.waitFor({ state: 'visible' });
    }

    const dropdownNames = [/Status/i, /Job/i, /Department/i];
    for (const name of dropdownNames) {
        console.log('Testing dropdown:', name);
        const dropdown = page.locator('.p-dropdown, [role="combobox"]').filter({ hasText: name }).first();
        console.log('Is visible?', await dropdown.isVisible());
        await dropdown.click();
        await page.waitForTimeout(500);
        const panel = page.locator('.p-dropdown-panel, .p-overlay').last();
        console.log('Panel visible?', await panel.isVisible());
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
    }
});
