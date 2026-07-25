import { test } from '@playwright/test';

import { ManageJournalEntryPage } from '../../../Pages/finance/general-ledger/journal-entry/manageJournalEntry';
import { ViewJournalEntryPage } from '../../../Pages/finance/general-ledger/journal-entry/viewJournalEntry';

let manageJournalEntryPage: ManageJournalEntryPage;
let viewJournalEntryPage: ViewJournalEntryPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }) => {
  manageJournalEntryPage = new ManageJournalEntryPage(page);
  viewJournalEntryPage = new ViewJournalEntryPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');
});
