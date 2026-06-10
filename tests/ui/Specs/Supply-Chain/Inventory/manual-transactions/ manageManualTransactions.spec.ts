import { test } from '@playwright/test';
import { ManageManualTransactionsPage } from '../../../../Pages/Supply-Chain/inventory/manual-transactions/ manageManualTransactions';

let pageObj!: ManageManualTransactionsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  pageObj = new ManageManualTransactionsPage(page);

  console.log(`Test start: ${testInfo.title}`);
await page.goto("/");
});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});
test('Verify Navigation To Manual Transactions Page', async () => {
  await pageObj.navigateToManualTransactions();
  await pageObj.verifyNavigationToManualTransactions();
});