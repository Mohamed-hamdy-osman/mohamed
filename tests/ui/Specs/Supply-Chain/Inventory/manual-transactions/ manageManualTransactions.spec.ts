import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManageManualTransactionsPage } from '../../../../Pages/Supply-Chain/inventory/manual-transactions/ manageManualTransactions';

let loginPage!: LoginPage;
let pageObj!: ManageManualTransactionsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  pageObj = new ManageManualTransactionsPage(page);

  console.log(`Test start: ${testInfo.title}`);
await loginPage.navigateToApp();
});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});
test('Verify Navigation To Manual Transactions Page', async () => {
  await pageObj.navigateToManualTransactions();
  await pageObj.verifyNavigationToManualTransactions();
});