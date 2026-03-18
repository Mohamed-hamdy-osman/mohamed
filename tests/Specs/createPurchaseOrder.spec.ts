import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { PurchaseOrderPage } from '../Pages/purchaseOrder';
import { CreatePurchaseOrderPage } from '../Pages/createPurchaseOrder';

let loginPage!: LoginPage;
let purchaseOrderPage!: PurchaseOrderPage;
let createPurchaseOrderPage!: CreatePurchaseOrderPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  purchaseOrderPage = new PurchaseOrderPage(page);
  createPurchaseOrderPage = new CreatePurchaseOrderPage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  await loginPage.login('admin@zeta.com','P@ssw0rd');

  await loginPage.verifyLoginSuccess();

  // ✅ استنى اللودر يختفي بعد اللوجين
  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Create Purchase Order', async ({ page }) => {

  // Navigate
  await purchaseOrderPage.navigateToPurchaseOrders();

  // ✅ استنى الصفحة تستقر
  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

  // Click Create
  await expect(purchaseOrderPage.create_btn).toBeVisible({ timeout: 15000 });
  await purchaseOrderPage.create_btn.click();

  // ✅ تأكد إن صفحة create فتحت
  await expect(page).toHaveURL(/add-purchase-order/);

  // Fill header
  await createPurchaseOrderPage.fillRequiredFields();

  // Add Lines
  await createPurchaseOrderPage.addMultiplePurchaseLines([

    {
      typeIndex: 0,
      itemIndex: 0,
      quantity: '5',
      price: '100'
    },

    {
      typeIndex: 0,
      itemIndex: 1,
      quantity: '10',
      price: '50'
    }

  ]);

  // Submit
  await createPurchaseOrderPage.submitPurchaseOrder();

});