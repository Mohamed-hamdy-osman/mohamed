import { test } from '@playwright/test';

import { ManageMiscTransactionsPage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/manageMiscelliniousTransactions';
import { CreateMiscellaneousIssuePage } from '../../../../Pages/Supply-Chain/inventory/miscellaneous-transactions/createMiscelliniousIssue';

let manageMiscTransactionsPage!: ManageMiscTransactionsPage;
let miscellaneousPage!: CreateMiscellaneousIssuePage;

test.setTimeout(60000);

test.beforeEach(async ({ page }) => {
  manageMiscTransactionsPage = new ManageMiscTransactionsPage(page);
  miscellaneousPage = new CreateMiscellaneousIssuePage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');
});
