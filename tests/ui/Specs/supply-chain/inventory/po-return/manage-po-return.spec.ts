import { test } from '@playwright/test';
import { ManagePOReturnPage } from '../../../../Pages/Supply-Chain/inventory/po-return/manage-po-return';

let poReturnPage!: ManagePOReturnPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  poReturnPage = new ManagePOReturnPage(page);

  await page.goto('/zeta/choose-module');
await page.waitForLoadState('load');
  console.log(`Test start: ${testInfo.title}`);

});

test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
    console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Manage PO Return Page', async () => {
  await poReturnPage.navigateToPOReturn();
  await poReturnPage.verifyNavigationToPOReturn();
});

test('Verify Search With Creation Date From And Creation Date To', async () => {
  await poReturnPage.navigateToPOReturn();
  await poReturnPage.creationDateFromAndCreationDateTo();
  await poReturnPage.searchPOReturn();
  await poReturnPage.verifySearchResult();
});