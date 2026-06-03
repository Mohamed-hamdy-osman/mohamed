import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManageStorekeepersPage } from '../../../../Pages/Supply-Chain/inventory/store-keepers/manageStoreKeepers';

let loginPage!: LoginPage;
let pageObj!: ManageStorekeepersPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  pageObj = new ManageStorekeepersPage(page);

  console.log(`Test start: ${testInfo.title}`);

await loginPage.navigateToApp();

});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Storekeepers Page', async () => {
  await pageObj.navigateToStorekeepers();
  await pageObj.verifyNavigationToStorekeepers();
});