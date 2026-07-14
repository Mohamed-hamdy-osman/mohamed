import { test } from '@playwright/test';

import { ManageMiscTransactionsPage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/manageMiscelliniousTransactions';
import { CreateMiscellaneousReceiptPage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/createMiscllaneousReceipt';


let manageMiscTransactionsPage!:
ManageMiscTransactionsPage;

let miscellaneousPage!:
CreateMiscellaneousReceiptPage;
test.setTimeout(60000);
test.beforeEach(async ({ page }) => {
  manageMiscTransactionsPage =
    new ManageMiscTransactionsPage(page);
  miscellaneousPage =
    new CreateMiscellaneousReceiptPage(page);
  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('networkidle');


});

test('Verify Create Miscellaneous Receipt', async () => {
await manageMiscTransactionsPage.navigateToMiscTransactions();
  await manageMiscTransactionsPage.create_btn.click();
  await miscellaneousPage.selectMiscellaneousReceipt();
  await miscellaneousPage.fillHeaders();
  await miscellaneousPage.addLine();
  await miscellaneousPage.saveTransaction();

});