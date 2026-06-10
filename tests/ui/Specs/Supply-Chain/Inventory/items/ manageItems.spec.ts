import { test } from '@playwright/test';
import { ManageItemsPage } from '../../../../Pages/Supply-Chain/inventory/items/ manageItems';


let itemsPage!: ManageItemsPage;
test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  itemsPage = new ManageItemsPage(page);

  console.log(`Test start: ${testInfo.title}`);

await page.goto("/");

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Items Page', async () => {

  await itemsPage.navigateToItems();
  await itemsPage.verifyNavigationToItems();

});