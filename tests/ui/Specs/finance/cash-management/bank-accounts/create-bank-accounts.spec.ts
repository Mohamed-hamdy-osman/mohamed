import { test } from '@playwright/test';
import { ManageBankAccountsPage } from '../../../../Pages/finance/cash-management/bank-accounts/manage-bank-accounts';
import { CreateBankAccountPage } from '../../../../Pages/finance/cash-management/bank-accounts/create-bank-accounts';


let manageBankAccountsPage!: ManageBankAccountsPage;
let createBankAccountPage!: CreateBankAccountPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {

  manageBankAccountsPage = new ManageBankAccountsPage(page);
  createBankAccountPage = new CreateBankAccountPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);

  await page.locator('.loader-wrapper').waitFor({
    state: 'hidden'
  });
});

test.afterEach(async ({ page }, testInfo) => {

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Create Bank Account', async () => {

  await manageBankAccountsPage.navigateToManageBankAccounts();

  await manageBankAccountsPage.verifyNavigationToManageBankAccounts();

  await createBankAccountPage.createBankAccount();

  await createBankAccountPage.verifyBankAccountCreated();

});