import { test } from '@playwright/test';
import { ManagePurchaseOrderPage } from '../../../../Pages/Supply-Chain/Purchasing/PO/managePurchaseOrder';

let purchaseOrderPage!: ManagePurchaseOrderPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  purchaseOrderPage = new ManagePurchaseOrderPage(page);
  console.log(`Test start: ${testInfo.title}`);
await page.goto("/");
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