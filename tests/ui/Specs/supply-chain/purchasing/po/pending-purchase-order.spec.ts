import { test } from '@playwright/test';
import { PendingPurchaseOrderPage } from '../../../../Pages/Supply-Chain/purchasing/po/pending-purchase-order';

let pendingPurchaseOrderPage!: PendingPurchaseOrderPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  pendingPurchaseOrderPage = new PendingPurchaseOrderPage(page);

  console.log(`Test start: ${testInfo.title}`);
  await page.goto('/zeta/choose-module');
await page.waitForLoadState('load');
});

test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
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
test('Verify Invalid Reject Pending Purchase Order Comment', async () => {
  await pendingPurchaseOrderPage.navigateToPendingPurchaseOrders();
  await pendingPurchaseOrderPage.InvalidRejectPurchaseOrderComment();
});

test('Verify Return Pending Purchase Order', async () => {
  await pendingPurchaseOrderPage.navigateToPendingPurchaseOrders();
  await pendingPurchaseOrderPage.returnPurchaseOrder();
});
test('Verify Invalid Return Pending Purchase Order Comment', async () => {
  await pendingPurchaseOrderPage.navigateToPendingPurchaseOrders();
  await pendingPurchaseOrderPage.InvalidReturnPurchaseOrderComment();
});