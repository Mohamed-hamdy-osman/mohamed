import { test } from '@playwright/test';
import { LoginPage } from '../../../Pages/login/loginPage';
import { ManagePurchaseOrderPage } from '../../../Pages/purchasing/purchase-order/managePurchaseOrder';

let loginPage!: LoginPage;
let purchaseOrderPage!: ManagePurchaseOrderPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  loginPage = new LoginPage(page);
  purchaseOrderPage = new ManagePurchaseOrderPage(page);
  await loginPage.goto();
  console.log(`Test start: ${testInfo.title}`);
  await loginPage.login('admin@zeta.com','P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();
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