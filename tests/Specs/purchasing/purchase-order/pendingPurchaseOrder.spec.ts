import { test } from '@playwright/test';
import { LoginPage } from '../../../Pages/login/loginPage';
import { PendingPurchaseOrderPage } from '../../../Pages/purchasing/purchase-order/pendingPurchaseOrder';

let loginPage!: LoginPage;
let pendingPurchaseOrderPage!: PendingPurchaseOrderPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  loginPage = new LoginPage(page);
  pendingPurchaseOrderPage = new PendingPurchaseOrderPage(page);

  console.log(`Test start: ${testInfo.title}`);
  await loginPage.goto();
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();
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