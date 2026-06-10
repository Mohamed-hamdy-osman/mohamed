import { test } from '@playwright/test';
import { ManagePOReceiptPage } from '../../../../Pages/Supply-Chain/inventory/po-receipt/managePoReceipt';
let poReceiptPage!: ManagePOReceiptPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  poReceiptPage = new ManagePOReceiptPage(page);
  
  await page.goto('/zeta');
  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Manage PO Receipt Page', async () => {
  await poReceiptPage.navigateToPOReceipt();
  await poReceiptPage.verifyNavigationToPOReceipt();
});

test('Verify Search With Creation Date From And Creation Date To', async () => {
  await poReceiptPage.navigateToPOReceipt();
  await poReceiptPage.creationDateFromAndCreationDateTo();
  await poReceiptPage.searchPurchaseRequest();
  await poReceiptPage.verifySearchResult();
});