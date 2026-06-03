import { test } from '@playwright/test';

import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManageMiscTransactionsPage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/manageMiscelliniousTransactions';
import { CreateMiscellaneousTransferPage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/createMiscllaneousTransfer';

let loginPage!: LoginPage;
let manageMiscTransactionsPage!: ManageMiscTransactionsPage;
let miscellaneousPage!: CreateMiscellaneousTransferPage;

test.setTimeout(90000);

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  manageMiscTransactionsPage = new ManageMiscTransactionsPage(page);
  miscellaneousPage = new CreateMiscellaneousTransferPage(page);

  await loginPage.navigateToApp();
});
