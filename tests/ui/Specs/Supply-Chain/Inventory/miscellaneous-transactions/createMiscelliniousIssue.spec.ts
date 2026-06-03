import { test } from '@playwright/test';

import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManageMiscTransactionsPage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/manageMiscelliniousTransactions';
import { CreateMiscellaneousIssuePage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/createMiscelliniousIssue';

let loginPage!: LoginPage;
let manageMiscTransactionsPage!: ManageMiscTransactionsPage;
let miscellaneousPage!: CreateMiscellaneousIssuePage;

test.setTimeout(90000);

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  manageMiscTransactionsPage = new ManageMiscTransactionsPage(page);
  miscellaneousPage = new CreateMiscellaneousIssuePage(page);

  await loginPage.goto();
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();
});
