import { test } from '@playwright/test';
import { ManageItemsPage } from '../../../../Pages/supply-chain/inventory/items/ manage-items';
import { CreateGroupsPage } from '../../../../Pages/supply-chain/inventory/items/create-group';

let itemsPage: ManageItemsPage;
let createGroupsPage: CreateGroupsPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {
  itemsPage = new ManageItemsPage(page);
  createGroupsPage = new CreateGroupsPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  const logToCorporateBtn = page.getByRole('button', { name: 'Log to Corporate' }).last();
  if (await logToCorporateBtn.isVisible()) {
    await Promise.all([
      page.waitForURL(/main/),
      logToCorporateBtn.click(),
    ]);
    await page.waitForLoadState('load');
  }

  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title} - ${testInfo.status}`);
});

test('Create Inventory Group', async () => {
  await createGroupsPage.goto();
  await createGroupsPage.selectGroupsTab();
  await createGroupsPage.clickCreateButton();
  await createGroupsPage.fillGroupDetails({
    name: 'Test Group',
    code: 'TG001',
    types: 'Inventory',
    pickingRule: 'Group Picking Rule',
  });
  await createGroupsPage.saveGroup();
  await createGroupsPage.verifyGroupCreation('Test Group');
});
