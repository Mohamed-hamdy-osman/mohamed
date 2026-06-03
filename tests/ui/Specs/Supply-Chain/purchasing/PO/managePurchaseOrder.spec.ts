import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManagePurchaseOrderPage } from '../../../../Pages/Supply-Chain/Purchasing/PO/managePurchaseOrder';

let loginPage!: LoginPage;
let purchaseOrderPage!: ManagePurchaseOrderPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  loginPage = new LoginPage(page);
  purchaseOrderPage = new ManagePurchaseOrderPage(page);
  console.log(`Test start: ${testInfo.title}`);
await loginPage.navigateToApp();
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