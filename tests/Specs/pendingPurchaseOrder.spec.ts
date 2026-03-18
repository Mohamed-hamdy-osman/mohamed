import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { PendingPurchaseOrderPage } from '../Pages/pendingPurchaseOrder';

let loginPage!: LoginPage;
let pendingPurchaseOrderPage!: PendingPurchaseOrderPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  // initialize pages
  loginPage = new LoginPage(page);
  pendingPurchaseOrderPage = new PendingPurchaseOrderPage(page);

  console.log(`Test start: ${testInfo.title}`);

  // open system
  await loginPage.goto();

  // login
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');

  // verify login success
  await loginPage.verifyLoginSuccess();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});


test('Verify Navigation To Manage Pending Purchase Orders Page', async () => {

  await pendingPurchaseOrderPage.navigateToPendingPurchaseOrders();

  await pendingPurchaseOrderPage.verifyNavigationToManagePendingPurchaseOrders();

});


test('Verify Approve Pending Purchase Order', async () => {

  await pendingPurchaseOrderPage.navigateToPendingPurchaseOrders();

  await pendingPurchaseOrderPage.approvePurchaseOrder();

});


test('Verify Reject Pending Purchase Order', async () => {

  await pendingPurchaseOrderPage.navigateToPendingPurchaseOrders();

  await pendingPurchaseOrderPage.rejectPurchaseOrder();

});


test('Verify Return Pending Purchase Order', async () => {

  await pendingPurchaseOrderPage.navigateToPendingPurchaseOrders();

  await pendingPurchaseOrderPage.returnPurchaseOrder();

});