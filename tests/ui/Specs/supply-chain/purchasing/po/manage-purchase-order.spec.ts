import { test } from '@playwright/test';
import { ManagePurchaseOrderPage } from '../../../../Pages/Supply-Chain/Purchasing/PO/managePurchaseOrder';

let purchaseOrderPage!: ManagePurchaseOrderPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  purchaseOrderPage = new ManagePurchaseOrderPage(page);
  await page.goto('/zeta/choose-module');
await page.waitForLoadState('load');
  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
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