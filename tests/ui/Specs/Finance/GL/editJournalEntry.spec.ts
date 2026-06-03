import { test } from '@playwright/test';

import { LoginPage } from '../../../Pages/Login/loginPage';
import { ManageJournalEntryPage } from '../../../Pages/Finance/GL/manageJournalEntry';
import { EditJournalEntryPage } from '../../../Pages/Finance/GL/editJournalEntry';

let loginPage: LoginPage;
let manageJournalEntryPage: ManageJournalEntryPage;
let editJournalEntryPage: EditJournalEntryPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  manageJournalEntryPage = new ManageJournalEntryPage(page);
  editJournalEntryPage = new EditJournalEntryPage(page);

  await loginPage.goto();
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();
});
