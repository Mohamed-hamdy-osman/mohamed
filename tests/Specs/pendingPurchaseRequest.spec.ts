import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { PendingPurchaseRequestPage } from '../Pages/pendingPurchaseRequest';

let loginPage: LoginPage;
let pendingPurchaseRequestPage: PendingPurchaseRequestPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  pendingPurchaseRequestPage = new PendingPurchaseRequestPage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  await loginPage.login('admin@zeta.com','P@ssw0rd');

  await loginPage.verifyLoginSuccess();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});


test('Verify Navigation To Manage Pending Purchase Requests Page', async () => {

  await pendingPurchaseRequestPage.navigateToPendingPurchaseRequests();

  await pendingPurchaseRequestPage.verifyNavigationToManagePendingPurchaseRequests();

});


;