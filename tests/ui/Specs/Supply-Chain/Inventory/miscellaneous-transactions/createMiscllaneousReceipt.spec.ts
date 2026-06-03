import { test } from '@playwright/test';

import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManageMiscTransactionsPage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/manageMiscelliniousTransactions';
import { CreateMiscellaneousReceiptPage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/createMiscllaneousReceipt';

let loginPage!: LoginPage;

let manageMiscTransactionsPage!:
ManageMiscTransactionsPage;

let miscellaneousPage!:
CreateMiscellaneousReceiptPage;
test.setTimeout(90000);
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  manageMiscTransactionsPage =
    new ManageMiscTransactionsPage(page);
  miscellaneousPage =
    new CreateMiscellaneousReceiptPage(page);
  await loginPage.goto();
  await loginPage.login(
    'admin@zeta.com',
    'P@ssw0rd'
  );

  await loginPage.verifyLoginSuccessWithCorporate();

});

test('Verify Create Miscellaneous Receipt', async () => {
await manageMiscTransactionsPage.navigateToMiscTransactions();
  await manageMiscTransactionsPage.create_btn.click();
  await miscellaneousPage.selectMiscellaneousReceipt();
  await miscellaneousPage.fillHeaders();
  await miscellaneousPage.addLine();
  await miscellaneousPage.saveTransaction();

});