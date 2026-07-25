import { test } from '@playwright/test';

import { ManageMiscTransactionsPage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/manage-miscellinious-transactions';
import { CreateMiscellaneousReceiptPage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/create-miscllaneous-receipt';


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
  await page.waitForLoadState('load');


});

test('Verify Create Miscellaneous Receipt', async () => {
await manageMiscTransactionsPage.navigateToMiscTransactions();
  await manageMiscTransactionsPage.create_btn.click();
  await miscellaneousPage.selectMiscellaneousReceipt();
  await miscellaneousPage.fillHeaders();
  await miscellaneousPage.addLine();
  await miscellaneousPage.saveTransaction();

});