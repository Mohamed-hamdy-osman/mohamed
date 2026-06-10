import { test } from '@playwright/test';
import { ManageStoresPage } from '../../../../Pages/Supply-Chain/inventory/stores/manageStores';


let storesPage!: ManageStoresPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  storesPage = new ManageStoresPage(page);

  console.log(`Test start: ${testInfo.title}`);

await page.goto("/");

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Stores Page', async () => {

  await storesPage.navigateToStores();
  await storesPage.verifyNavigationToStores();

});