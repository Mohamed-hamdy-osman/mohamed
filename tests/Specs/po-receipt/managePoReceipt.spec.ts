import { test } from '@playwright/test';
import { LoginPage } from '../../Pages/login/loginPage';
import { ManagePOReceiptPage } from '../../Pages/po-receipt/managePOReceipt';
let loginPage!: LoginPage;
let poReceiptPage!: ManagePOReceiptPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  loginPage = new LoginPage(page);
  poReceiptPage = new ManagePOReceiptPage(page);
  
  await loginPage.goto();
  console.log(`Test start: ${testInfo.title}`);
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();
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