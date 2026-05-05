import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import {ManageItemsPage } from '../Pages/ manageItems';
let loginPage!: LoginPage;
let itemsPage!: ManageItemsPage;  

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  itemsPage = new ManageItemsPage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Items Page', async () => {

  await itemsPage.navigateToItems();
  await itemsPage.verifyNavigationToItems();

});