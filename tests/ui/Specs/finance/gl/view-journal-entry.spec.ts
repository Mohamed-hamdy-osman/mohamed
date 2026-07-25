import { test } from '@playwright/test';

import { ManageJournalEntryPage } from '../../../Pages/finance/GL/manageJournalEntry';
import { ViewJournalEntryPage } from '../../../Pages/finance/GL/viewJournalEntry';

let manageJournalEntryPage: ManageJournalEntryPage;
let viewJournalEntryPage: ViewJournalEntryPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }) => {
  manageJournalEntryPage = new ManageJournalEntryPage(page);
  viewJournalEntryPage = new ViewJournalEntryPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');
});
