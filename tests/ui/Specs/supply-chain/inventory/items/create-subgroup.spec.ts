import { test } from '@playwright/test';
import { ManageItemsPage } from '../../../../Pages/supply-chain/inventory/items/ manage-items';
import { CreateSubGroupsPage } from '../../../../Pages/supply-chain/inventory/items/create-subgroup';

let itemsPage: ManageItemsPage;
let createSubGroupsPage: CreateSubGroupsPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {
  itemsPage = new ManageItemsPage(page);
  createSubGroupsPage = new CreateSubGroupsPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  await page
    .locator('.loader-wrapper')
    .waitFor({
      state: 'hidden',
      timeout: 20000,
    });

  await page
    .getByRole('button', { name: 'Log to Corporate' })
    .last()
    .click();

  await page
    .locator('.loader-wrapper')
    .waitFor({
      state: 'hidden',
      timeout: 20000,
    });

  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({}, testInfo) => {
  console.log(
    `Test end: ${testInfo.title} - ${testInfo.status}`
  );
});

test('Create Inventory Sub Group', async () => {
  await createSubGroupsPage.goto();

  await createSubGroupsPage.createSubGroupForType('Inventory');
});

test('Create Expenses Sub Group', async () => {
  await createSubGroupsPage.goto();

  await createSubGroupsPage.createSubGroupForType('Expenses');
});

test('Create Assets Sub Group', async () => {
  await createSubGroupsPage.goto();

  await createSubGroupsPage.createSubGroupForType('Assets');
});