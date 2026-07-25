import { test } from '@playwright/test';
import { ManageBankAccountsPage } from '../../../../Pages/finance/CashManagement/BankAccounts/manageBankAccounts';

let manageBankAccountsPage!: ManageBankAccountsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  manageBankAccountsPage = new ManageBankAccountsPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);

  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
});

test.afterEach(async ({ page }, testInfo) => {

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Manage Bank Accounts Page', async ({ page }) => {

  await manageBankAccountsPage.navigateToManageBankAccounts();

  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

  await manageBankAccountsPage.verifyNavigationToManageBankAccounts();

});