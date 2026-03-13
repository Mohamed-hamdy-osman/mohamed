import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { PurchaseRequestPage } from '../Pages/purchaseRequest';
import { CreatePurchaseRequestPage } from '../Pages/createPurchaseRequest';

let loginPage!: LoginPage;
let purchaseRequestPage!: PurchaseRequestPage;
let createPurchaseRequestPage!: CreatePurchaseRequestPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  purchaseRequestPage = new PurchaseRequestPage(page);
  createPurchaseRequestPage = new CreatePurchaseRequestPage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  await loginPage.login('admin@zeta.com','P@ssw0rd');

  await loginPage.verifyLoginSuccess();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Create Purchase Request', async () => {

  // Navigate to Purchase Requests page
  await purchaseRequestPage.navigateToPurchaseRequests();

  // Click Create
  await purchaseRequestPage.create_btn.click();

  // Fill header fields
  await createPurchaseRequestPage.fillRequiredFields();

  // Add new line
  await createPurchaseRequestPage.addPurchaseLine();

  // Fill line data
  await createPurchaseRequestPage.fillPurchaseLine();

  // Save line
  await createPurchaseRequestPage.saveLine();

  // Submit Purchase Request
  await createPurchaseRequestPage.submitPurchaseRequest();

});