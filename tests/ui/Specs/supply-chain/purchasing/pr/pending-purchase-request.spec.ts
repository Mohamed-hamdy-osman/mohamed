import { test } from '@playwright/test';
import { PendingPurchaseRequestPage } from '../../../../Pages/Supply-Chain/purchasing/pr/pending-purchase-request';

let pendingPurchaseRequestPage: PendingPurchaseRequestPage;

test.setTimeout(60000);
test.beforeEach(async ({ page }, testInfo) => {
  pendingPurchaseRequestPage = new PendingPurchaseRequestPage(page);

  console.log(`Test start: ${testInfo.title}`);
  await page.goto('/zeta/choose-module');
await page.waitForLoadState('load');
});

test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
    console.log(`Test end: ${testInfo.title}`);
});


test('Verify Navigation To Manage Pending Purchase Requests Page', async () => {
  await pendingPurchaseRequestPage.navigateToPendingPurchaseRequests();
  await pendingPurchaseRequestPage.verifyNavigationToManagePendingPurchaseRequests();
});


test('Verify Approve Pending Purchase Request', async () => {
  await pendingPurchaseRequestPage.navigateToPendingPurchaseRequests();
  await pendingPurchaseRequestPage.approvePurchaseRequest();
});


test('Verify Reject Pending Purchase Request', async () => {
  await pendingPurchaseRequestPage.navigateToPendingPurchaseRequests();
  await pendingPurchaseRequestPage.rejectPurchaseRequest();
});
test('Verify Invalid Reject Pending Purchase Request Comment', async () => {
  await pendingPurchaseRequestPage.navigateToPendingPurchaseRequests();
  await pendingPurchaseRequestPage.InvalidRejectPurchaseRequest();
});

test('Verify Return Pending Purchase Request', async () => {
  await pendingPurchaseRequestPage.navigateToPendingPurchaseRequests();
  await pendingPurchaseRequestPage.returnPurchaseRequest();
}); 
test('Verify Invalid Return Pending Purchase Request Comment', async () => {
  await pendingPurchaseRequestPage.navigateToPendingPurchaseRequests();
  await pendingPurchaseRequestPage.InvalidReturnPurchaseRequest();
}); 