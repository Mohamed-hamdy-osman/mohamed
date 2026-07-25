import { test } from '@playwright/test';
import { ManageMiscTransactionsPage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/manageMiscelliniousTransactions';


let miscTransactionsPage!: ManageMiscTransactionsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  miscTransactionsPage = new ManageMiscTransactionsPage(page);
 
  await page.goto('/zeta/choose-module');
await page.waitForLoadState('load');
  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
    console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Manage Miscellaneous Transactions Page', async () => {
  await miscTransactionsPage.navigateToMiscTransactions();
  await miscTransactionsPage.verifyNavigationToMiscTransactions();
});

test('Verify Search With Creation Date From And Creation Date To', async () => {
  await miscTransactionsPage.navigateToMiscTransactions();
  await miscTransactionsPage.creationDateFromAndCreationDateTo();
  await miscTransactionsPage.searchMiscTransactions();
  await miscTransactionsPage.verifySearchResult();
});