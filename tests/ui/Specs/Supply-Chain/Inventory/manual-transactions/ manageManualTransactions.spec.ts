import { test } from '@playwright/test';
import { ManageManualTransactionsPage } from '../../../../Pages/Supply-Chain/inventory/manual-transactions/ manageManualTransactions';

let pageObj!: ManageManualTransactionsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  pageObj = new ManageManualTransactionsPage(page);

  await page.goto('/zeta');
  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({}, testInfo) => {
console.log(`Test end: ${testInfo.title}`);
});
test('Verify Navigation To Manual Transactions Page', async () => {
await pageObj.navigateToManualTransactions();
});