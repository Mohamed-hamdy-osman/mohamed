import { test } from '@playwright/test';
import { LoginPage } from '../../../Pages/login/loginPage';
import { ManagePurchaseRequestPage } from '../../../Pages/purchasing/purchase-request/managePurchaseRequest';
import { CreatePurchaseRequestPage } from '../../../Pages/purchasing/purchase-request/createPurchaseRequest';

let loginPage!: LoginPage;
let managePurchaseRequestPage!: ManagePurchaseRequestPage;
let createPurchaseRequestPage!: CreatePurchaseRequestPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  managePurchaseRequestPage = new ManagePurchaseRequestPage(page);
  createPurchaseRequestPage = new CreatePurchaseRequestPage(page);
  await loginPage.goto();
  console.log(`Test start: ${testInfo.title}`);
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();
});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Create Purchase Request', async () => {
  await managePurchaseRequestPage.navigateToPurchaseRequests();
  await managePurchaseRequestPage.create_btn.click();
  await createPurchaseRequestPage.fillRequiredFields();
  await createPurchaseRequestPage.addMultiplePurchaseLines([
    {
      typeIndex: 0,
      groupIndex: 0,
      subGroupIndex: 0,
      itemIndex: 0,
      uomIndex: 0,
      withCostCenter: true,
      quantity: '10',
      price: '20'
    },

    {
      typeIndex: 0,
      groupIndex: 1,
      subGroupIndex: 0,
      itemIndex: 0,
      uomIndex: 0,
      quantity: '15',
      price: '30'
    },

    {
      typeIndex: 0,
      groupIndex: 2,
      subGroupIndex: 0,
      itemIndex: 0,
      uomIndex: 0,
      quantity: '5',
      price: '25'
    },

  ]);

  await createPurchaseRequestPage.submitPurchaseRequest();
});