import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ManageStoresPage } from '../Pages/manageStores';

let loginPage!: LoginPage;
let storesPage!: ManageStoresPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  storesPage = new ManageStoresPage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Stores Page', async () => {

  await storesPage.navigateToStores();
  await storesPage.verifyNavigationToStores();

});