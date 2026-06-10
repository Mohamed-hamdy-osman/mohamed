import { test } from '@playwright/test';
import { ManageStorekeepersPage } from '../../../../Pages/Supply-Chain/inventory/store-keepers/manageStoreKeepers';

let pageObj!: ManageStorekeepersPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  pageObj = new ManageStorekeepersPage(page);

  console.log(`Test start: ${testInfo.title}`);

await page.goto("/");

});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Storekeepers Page', async () => {
  await pageObj.navigateToStorekeepers();
  await pageObj.verifyNavigationToStorekeepers();
});