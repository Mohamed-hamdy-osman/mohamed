import { test } from '@playwright/test';

import { ManageJournalEntryPage } from '../../../Pages/finance/GL/manageJournalEntry';
import { EditJournalEntryPage } from '../../../Pages/finance/GL/editJournalEntry';

let manageJournalEntryPage: ManageJournalEntryPage;
let editJournalEntryPage: EditJournalEntryPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }) => {
  manageJournalEntryPage = new ManageJournalEntryPage(page);
  editJournalEntryPage = new EditJournalEntryPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');
});
