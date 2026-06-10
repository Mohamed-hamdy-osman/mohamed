import { test } from '@playwright/test';
import { ManagePurchaseRequestPage } from '../../../../Pages/Supply-Chain/Purchasing/PR/managePurchaseRequest';
let purchaseRequestPage!: ManagePurchaseRequestPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  purchaseRequestPage = new ManagePurchaseRequestPage(page);

  await page.goto('/zeta');

  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Manage Purchase Requests Page', async () => {
  await purchaseRequestPage.navigateToPurchaseRequests();
  await purchaseRequestPage.verifyNavigationToManagePurchaseRequests();
});

test('Verify Search With Creation Date From And Creation Date To', async () => {
  await purchaseRequestPage.navigateToPurchaseRequests();
  await purchaseRequestPage.creationDateFromAndCreationDateTo();
  await purchaseRequestPage.searchPurchaseRequest();
  await purchaseRequestPage.verifySearchResult();
});