import { test } from '@playwright/test';
import { ManageItemsPage } from '../../../../Pages/supply-chain/inventory/items/ manage-items';
import { CreateItemsPage } from '../../../../Pages/supply-chain/inventory/items/create-item';

let itemsPage: ManageItemsPage;
let createItemsPage: CreateItemsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  itemsPage = new ManageItemsPage(page);
  createItemsPage = new CreateItemsPage(page);

  await page.goto('/zeta/choose-module');

  await page.waitForLoadState('load');

  await page
    .locator('.loader-wrapper')
    .waitFor({
      state: 'hidden',
      timeout: 20000,
    });

  await page
    .getByRole('button', {
      name: 'Log to Corporate',
    })
    .last()
    .click();

  await page
    .locator('.loader-wrapper')
    .waitFor({
      state: 'hidden',
      timeout: 20000,
    });

  await page.waitForLoadState('load');

  console.log(
    `Test start: ${testInfo.title}`
  );
});

test.afterEach(async ({}, testInfo) => {
  console.log(
    `Test end: ${testInfo.title} - ${testInfo.status}`
  );
});

test('Create Inventory Item', async () => {
  await createItemsPage.goto();

  await createItemsPage.createInventoryItem();
});