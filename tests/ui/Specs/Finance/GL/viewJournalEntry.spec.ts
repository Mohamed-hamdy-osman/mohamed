import { test } from '@playwright/test';

import { LoginPage } from '../../../Pages/Login/loginPage';
import { ManageJournalEntryPage } from '../../../Pages/Finance/GL/manageJournalEntry';
import { ViewJournalEntryPage } from '../../../Pages/Finance/GL/viewJournalEntry';

let loginPage: LoginPage;
let manageJournalEntryPage: ManageJournalEntryPage;
let viewJournalEntryPage: ViewJournalEntryPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  manageJournalEntryPage = new ManageJournalEntryPage(page);
  viewJournalEntryPage = new ViewJournalEntryPage(page);

  await loginPage.goto();
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();
});
