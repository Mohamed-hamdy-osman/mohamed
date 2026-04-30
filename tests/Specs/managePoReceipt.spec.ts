import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ManagePOReceiptPage } from '../Pages/managePoReceipt'; 
let loginPage!: LoginPage;
let poReceiptPage!: ManagePOReceiptPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  // initialize pages
  loginPage = new LoginPage(page);
  poReceiptPage = new ManagePOReceiptPage(page);

  // open system
  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  // login
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');

  // verify login
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