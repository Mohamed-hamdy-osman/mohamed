import { test } from '@playwright/test';
import { ManageStoresPage } from '../../../../Pages/Supply-Chain/inventory/stores/manage-stores';


let storesPage!: ManageStoresPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  storesPage = new ManageStoresPage(page);

  await page.goto('/zeta/choose-module');
await page.waitForLoadState('load');
  console.log(`Test start: ${testInfo.title}`);


});

test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
    console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Stores Page', async () => {

  await storesPage.navigateToStores();
  await storesPage.verifyNavigationToStores();

});