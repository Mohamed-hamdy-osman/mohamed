import { test } from '@playwright/test';

import { ManageMiscTransactionsPage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/manageMiscelliniousTransactions';
import { CreateMiscellaneousTransferPage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/createMiscllaneousTransfer';

let manageMiscTransactionsPage!: ManageMiscTransactionsPage;
let miscellaneousPage!: CreateMiscellaneousTransferPage;

test.setTimeout(90000);

test.beforeEach(async ({ page }) => {
  manageMiscTransactionsPage = new ManageMiscTransactionsPage(page);
  miscellaneousPage = new CreateMiscellaneousTransferPage(page);

  await page.goto("/");
});
