import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { PurchaseRequestPage } from '../Pages/purchaseRequest';

let loginPage!: LoginPage;
let purchaseRequestPage!: PurchaseRequestPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  // initialize pages
  loginPage = new LoginPage(page);
  purchaseRequestPage = new PurchaseRequestPage(page);

  // open system
  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  // login
  await loginPage.login('admin@zeta.com','P@ssw0rd');

  // verify login
  await loginPage.verifyLoginSuccess();

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