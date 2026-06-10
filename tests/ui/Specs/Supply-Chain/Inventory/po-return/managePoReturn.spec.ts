import { test } from '@playwright/test';
import { ManagePOReturnPage } from '../../../../Pages/Supply-Chain/inventory/po-return/managePoReturn';

let poReturnPage!: ManagePOReturnPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  poReturnPage = new ManagePOReturnPage(page);

  console.log(`Test start: ${testInfo.title}`);

await page.goto("/");
});

test.afterEach(async ({}, testInfo) => {
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