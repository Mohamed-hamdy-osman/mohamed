import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManagePOReceiptPage } from '../../../../Pages/Supply-Chain/inventory/po-receipt/managePoReceipt';
import { CreatePOReceiptPage } from '../../../../Pages/Supply-Chain/inventory/po-receipt/createPoReceipt';
let loginPage: LoginPage;
let managePOReceiptPage: ManagePOReceiptPage;
let createPOReceiptPage: CreatePOReceiptPage;
test.setTimeout(90000);
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  managePOReceiptPage = new ManagePOReceiptPage(page);
  createPOReceiptPage = new CreatePOReceiptPage(page);
  await loginPage.navigateToApp();
});
test('Verify Create PO Receipt', async () => {
  await managePOReceiptPage.navigateToPOReceipt();
  await createPOReceiptPage.startCreatePOReceipt();
  await createPOReceiptPage.selectFirstPO();
  await createPOReceiptPage.selectLinesAndFillQty();
  await createPOReceiptPage.savePOReceipt();
});