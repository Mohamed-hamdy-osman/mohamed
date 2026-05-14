import { test } from '@playwright/test';
import { LoginPage } from '../../Pages/login/loginPage';
import { ManagePOReceiptPage } from '../../Pages/po-receipt/managePOReceipt';
import { CreatePOReceiptPage } from '../../Pages/po-receipt/createPoReceipt';
let loginPage: LoginPage;
let managePOReceiptPage: ManagePOReceiptPage;
let createPOReceiptPage: CreatePOReceiptPage;
test.setTimeout(90000);
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  managePOReceiptPage = new ManagePOReceiptPage(page);
  createPOReceiptPage = new CreatePOReceiptPage(page);
  await loginPage.goto();
  await loginPage.login(
    'admin@zeta.com',
    'P@ssw0rd'
  );
  await loginPage.verifyLoginSuccessWithCorporate();
});
test('Verify Create PO Receipt', async () => {
  await managePOReceiptPage.navigateToPOReceipt();
  await createPOReceiptPage.startCreatePOReceipt();
  await createPOReceiptPage.selectFirstPO();
  await createPOReceiptPage.selectLinesAndFillQty();
  await createPOReceiptPage.savePOReceipt();
});