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

  await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 20000 });
  await page.getByRole('button', { name: 'Log to Corporate' }).last().click();
  await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 20000 });
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title} - ${testInfo.status}`);
});

test('Create Inventory Group', async () => {
  const uid = Math.floor(Math.random() * 900 + 100);
  const name = `Inventory Group ${uid}`;
  const code = `INV-${uid}`;
  await createGroupsPage.goto();
  await createGroupsPage.selectGroupsTab();
  await createGroupsPage.clickCreateButton();
  await createGroupsPage.fillGroupDetails({ name, code, types: 'Inventory', pickingRule: 'Picking Rule' });
  await createGroupsPage.saveGroup();
  await createGroupsPage.verifyGroupCreation(name);
});

test('Create Expenses Group', async () => {
  const uid = Math.floor(Math.random() * 900 + 100);
  const name = `Expenses Group ${uid}`;
  const code = `EXP-${uid}`;
  await createGroupsPage.goto();
  await createGroupsPage.selectGroupsTab();
  await createGroupsPage.clickCreateButton();
  await createGroupsPage.fillGroupDetails({ name, code, types: 'Expenses' });
  await createGroupsPage.saveGroup();
  await createGroupsPage.verifyGroupCreation(name);
});

test('Create Assets Group', async () => {
  const uid = Math.floor(Math.random() * 900 + 100);
  const name = `Assets Group ${uid}`;
  const code = `AST-${uid}`;
  await createGroupsPage.goto();
  await createGroupsPage.selectGroupsTab();
  await createGroupsPage.clickCreateButton();
  await createGroupsPage.fillGroupDetails({ name, code, types: 'Assets' });
  await createGroupsPage.saveGroup();
  await createGroupsPage.verifyGroupCreation(name);
});