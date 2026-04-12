import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { PendingPurchaseRequestPage } from '../Pages/pendingPurchaseRequest';

let loginPage: LoginPage;
let pendingPurchaseRequestPage: PendingPurchaseRequestPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  // initialize pages
  loginPage = new LoginPage(page);
  pendingPurchaseRequestPage = new PendingPurchaseRequestPage(page);

  console.log(`Test start: ${testInfo.title}`);

  // open system
  await loginPage.goto();

  // login
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');

  // verify login success
  await loginPage.verifyLoginSuccessWithCorporate();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});


test('Verify Navigation To Manage Pending Purchase Requests Page', async ({ page }) => {

  await pendingPurchaseRequestPage.navigateToPendingPurchaseRequests();

  await pendingPurchaseRequestPage.verifyNavigationToManagePendingPurchaseRequests();

});


test('Verify Approve Pending Purchase Request', async ({ page }) => {

  await pendingPurchaseRequestPage.navigateToPendingPurchaseRequests();

  await pendingPurchaseRequestPage.approvePurchaseRequest();

});


test('Verify Reject Pending Purchase Request', async ({ page }) => {

  await pendingPurchaseRequestPage.navigateToPendingPurchaseRequests();

  await pendingPurchaseRequestPage.rejectPurchaseRequest();

});


test('Verify Return Pending Purchase Request', async ({ page }) => {

  await pendingPurchaseRequestPage.navigateToPendingPurchaseRequests();

  await pendingPurchaseRequestPage.returnPurchaseRequest();

}); 