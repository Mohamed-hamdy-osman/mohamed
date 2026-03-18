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

  await loginPage.login('admin@zeta.com', 'P@ssw0rd');

  await loginPage.verifyLoginSuccess();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Create Purchase Request', async () => {

  // Navigate to Purchase Requests
  await purchaseRequestPage.navigateToPurchaseRequests();

  // Click Create
  await purchaseRequestPage.create_btn.click();

  // Fill header fields
  await createPurchaseRequestPage.fillRequiredFields();

  // Add multiple lines
  await createPurchaseRequestPage.addMultiplePurchaseLines([

    // Line 1 (Item + Cost Center)
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

    // Line 2 (Item)
    {
      typeIndex: 0,
      groupIndex: 1,
      subGroupIndex: 0,
      itemIndex: 0,
      uomIndex: 0,
      quantity: '15',
      price: '30'
    },

    // Line 3 (Item)
    {
      typeIndex: 0,
      groupIndex: 2,
      subGroupIndex: 0,
      itemIndex: 0,
      uomIndex: 0,
      quantity: '5',
      price: '25'
    },

    // Line 4 (Service)
    //{
     // typeIndex: 1,
     // isService: true,
      //withCostCenter: true,
     // additionalDescription: 'Service Additional Description',
    //  description: 'Service Description',
     // price: '100'
   // }

  ]);

  // Submit Purchase Request
  await createPurchaseRequestPage.submitPurchaseRequest();

});