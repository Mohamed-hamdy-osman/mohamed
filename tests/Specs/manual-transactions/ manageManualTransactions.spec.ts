import { test } from '@playwright/test';
import { LoginPage } from '../../Pages/login/loginPage';
import { ManageManualTransactionsPage } from '../../Pages/manual-transactions/ manageManualTransactions';

let loginPage!: LoginPage;
let pageObj!: ManageManualTransactionsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  pageObj = new ManageManualTransactionsPage(page);

  await loginPage.goto();
  console.log(`Test start: ${testInfo.title}`);
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();
});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});
test('Verify Navigation To Manual Transactions Page', async () => {
  await pageObj.navigateToManualTransactions();
  await pageObj.verifyNavigationToManualTransactions();
});