import { test } from '@playwright/test';

import { ManageJournalEntryPage } from '../../../Pages/Finance/GL/manageJournalEntry';
import { EditJournalEntryPage } from '../../../Pages/Finance/GL/editJournalEntry';

let manageJournalEntryPage: ManageJournalEntryPage;
let editJournalEntryPage: EditJournalEntryPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }) => {
  manageJournalEntryPage = new ManageJournalEntryPage(page);
  editJournalEntryPage = new EditJournalEntryPage(page);

  await page.goto('/zeta');
});
