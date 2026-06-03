import { test, expect } from '@playwright/test';

import { LoginPage } from '../../../../Pages/Login/loginPage';

import { ManagePurchaseOrderPage } from '../../../../Pages/Supply-Chain/Purchasing/PO/managePurchaseOrder';

import { CreatePurchaseOrderPage } from '../../../../Pages/Supply-Chain/Purchasing/PO/createPurchaseOrder';
let loginPage!: LoginPage;

let managePurchaseOrderPage!: ManagePurchaseOrderPage;

let createPurchaseOrderPage!: CreatePurchaseOrderPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);

  managePurchaseOrderPage =
    new ManagePurchaseOrderPage(page);

  createPurchaseOrderPage =
    new CreatePurchaseOrderPage(page);

  console.log(`Test start: ${testInfo.title}`);

await loginPage.navigateToApp();

  await page
    .locator('.loader-wrapper')
    .waitFor({ state: 'hidden' });

});


test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});


test(
  'Verify Create Purchase Order',

  async ({ page }) => {

    await managePurchaseOrderPage
      .navigateToPurchaseOrders();

    await page
      .locator('.loader-wrapper')
      .waitFor({ state: 'hidden' });

    await expect(
      managePurchaseOrderPage.create_btn
    ).toBeVisible({
      timeout: 15000
    });

    await managePurchaseOrderPage
      .create_btn
      .click();

    await expect(page).toHaveURL(
      /add-purchase-order/
    );

    await createPurchaseOrderPage
      .fillRequiredFields();

    await createPurchaseOrderPage
      .addMultiplePurchaseLines([

          {
          typeIndex: 0,
          groupIndex: 2,
          subGroupIndex: 1,
          itemIndex: 0,
          uomIndex: 0,
          quantity: '10',
          price: '100',
         },
         {
          typeIndex: 0,
          groupIndex: 2,
          subGroupIndex: 0,
          itemIndex: 0,
          uomIndex: 0,
          quantity: '10',
          price: '25'
        },

        {
          typeIndex: 0,
          groupIndex: 1,
          subGroupIndex: 0,
          itemIndex: 1,
          uomIndex: 0,
          quantity: '15',
          price: '30'
        },

       
      ]);

    await createPurchaseOrderPage
      .submitPurchaseOrder();

  }

);