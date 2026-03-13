import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { PendingPurchaseOrderPage } from '../Pages/pendingPurchaseOrder';

let loginPage: LoginPage;
let pendingPurchaseOrderPage: PendingPurchaseOrderPage;

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  pendingPurchaseOrderPage = new PendingPurchaseOrderPage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  await loginPage.login('admin@zeta.com','P@ssw0rd');

  await loginPage.verifyLoginSuccess();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Manage Pending Purchase Orders Page', async () => {

  await pendingPurchaseOrderPage.navigateToPendingPurchaseOrders();

  await pendingPurchaseOrderPage.verifyNavigationToManagePendingPurchaseOrders();


});