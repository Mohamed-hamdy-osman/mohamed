import { test } from '@playwright/test';
import { ManageItemsPage } from '../../../../Pages/Supply-Chain/inventory/items/ manageItems';


let itemsPage!: ManageItemsPage;
test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  itemsPage = new ManageItemsPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('networkidle');

  console.log(`Test start: ${testInfo.title}`);


});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Items Page', async () => {

  await itemsPage.navigateToItems();
  await itemsPage.verifyNavigationToItems();

});