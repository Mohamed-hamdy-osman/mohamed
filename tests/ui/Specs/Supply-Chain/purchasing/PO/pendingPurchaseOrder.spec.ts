import { test } from '@playwright/test';
import { PendingPurchaseOrderPage } from '../../../../Pages/Supply-Chain/Purchasing/PO/pendingPurchaseOrder';

let pendingPurchaseOrderPage!: PendingPurchaseOrderPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  pendingPurchaseOrderPage = new PendingPurchaseOrderPage(page);

  console.log(`Test start: ${testInfo.title}`);
  await page.goto('/zeta');
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