import { test } from '@playwright/test';

import { ManageJournalEntryPage } from '../../../Pages/Finance/GL/manageJournalEntry';
import { ViewJournalEntryPage } from '../../../Pages/Finance/GL/viewJournalEntry';

let manageJournalEntryPage: ManageJournalEntryPage;
let viewJournalEntryPage: ViewJournalEntryPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }) => {
  manageJournalEntryPage = new ManageJournalEntryPage(page);
  viewJournalEntryPage = new ViewJournalEntryPage(page);

  await page.goto("/");
});
