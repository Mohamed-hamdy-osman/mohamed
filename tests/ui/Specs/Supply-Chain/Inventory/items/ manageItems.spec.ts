import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManageItemsPage } from '../../../../Pages/Supply-Chain/inventory/items/ manageItems';


let loginPage!: LoginPage;
let itemsPage!: ManageItemsPage;
test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  itemsPage = new ManageItemsPage(page);

  console.log(`Test start: ${testInfo.title}`);

await loginPage.navigateToApp();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Items Page', async () => {

  await itemsPage.navigateToItems();
  await itemsPage.verifyNavigationToItems();

});