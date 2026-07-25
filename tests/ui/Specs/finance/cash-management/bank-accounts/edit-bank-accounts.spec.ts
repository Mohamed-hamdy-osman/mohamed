import { test } from '@playwright/test';
import { ManageBankAccountsPage } from '../../../../Pages/finance/CashManagement/BankAccounts/manageBankAccounts';
import { EditBankAccountPage } from '../../../../Pages/finance/CashManagement/BankAccounts/editBankAccounts';


let manageBankAccountsPage!: ManageBankAccountsPage;
let editBankAccountPage!: EditBankAccountPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {

  manageBankAccountsPage = new ManageBankAccountsPage(page);
  editBankAccountPage = new EditBankAccountPage(page);

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

test('Verify Edit Bank Account', async () => {

  await manageBankAccountsPage.navigateToManageBankAccounts();

  await manageBankAccountsPage.verifyNavigationToManageBankAccounts();

  await editBankAccountPage.editBankAccount();

  await editBankAccountPage.verifyBankAccountUpdated();

});