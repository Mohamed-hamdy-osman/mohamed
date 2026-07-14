import { test } from '@playwright/test';
import { ManagePOReceiptPage } from '../../../../Pages/Supply-Chain/inventory/po-receipt/managePoReceipt';
import { CreatePOReceiptPage } from '../../../../Pages/Supply-Chain/inventory/po-receipt/createPoReceipt';
let managePOReceiptPage: ManagePOReceiptPage;
let createPOReceiptPage: CreatePOReceiptPage;
test.setTimeout(60000);
test.beforeEach(async ({ page }) => {
  managePOReceiptPage = new ManagePOReceiptPage(page);
  createPOReceiptPage = new CreatePOReceiptPage(page);
  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('networkidle');
});
test('Verify Create PO Receipt', async () => {
  await managePOReceiptPage.navigateToPOReceipt();
  await createPOReceiptPage.startCreatePOReceipt();
  await createPOReceiptPage.selectFirstPO();
  await createPOReceiptPage.selectLinesAndFillQty();
  await createPOReceiptPage.savePOReceipt();
});