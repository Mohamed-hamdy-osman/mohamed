import { test } from '@playwright/test';

import { ManageJournalEntryPage } from '../../../Pages/finance/general-ledger/journal-entry/manage-journal-entry';
import { ViewJournalEntryPage } from '../../../Pages/finance/general-ledger/journal-entry/view-journal-entry';

let manageJournalEntryPage: ManageJournalEntryPage;
let viewJournalEntryPage: ViewJournalEntryPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }) => {
  manageJournalEntryPage = new ManageJournalEntryPage(page);
  viewJournalEntryPage = new ViewJournalEntryPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');
});
