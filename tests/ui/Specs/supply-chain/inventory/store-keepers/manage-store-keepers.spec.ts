import { test } from '@playwright/test';
import { ManageStorekeepersPage } from '../../../../Pages/Supply-Chain/inventory/store-keepers/manage-store-keepers';

let pageObj!: ManageStorekeepersPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  pageObj = new ManageStorekeepersPage(page);

  await page.goto('/zeta/choose-module');
await page.waitForLoadState('load');
  console.log(`Test start: ${testInfo.title}`);


});

test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
    console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Storekeepers Page', async () => {
  await pageObj.navigateToStorekeepers();
  await pageObj.verifyNavigationToStorekeepers();
});