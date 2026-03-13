import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { PurchaseOrderPage } from '../Pages/purchaseOrder';

let loginPage!: LoginPage;
let purchaseOrderPage!: PurchaseOrderPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  purchaseOrderPage = new PurchaseOrderPage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  await loginPage.login('admin@zeta.com','P@ssw0rd');

  await loginPage.verifyLoginSuccess();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Manage Purchase Orders Page', async () => {

  await purchaseOrderPage.navigateToPurchaseOrders();

  await purchaseOrderPage.verifyNavigationToManagePurchaseOrders();

});

test('Verify Search With Creation Date From And Creation Date To', async () => {

  await purchaseOrderPage.navigateToPurchaseOrders();

  await purchaseOrderPage.creationDateFromAndCreationDateTo();

  await purchaseOrderPage.searchPurchaseOrder();

  await purchaseOrderPage.verifySearchResult();

});