import { test } from '@playwright/test';
import { LoginPage } from '../../Pages/login/loginPage';
import { ManageJournalEntryPage } from '../../Pages/journal-entry/manageJournalEntry';


let loginPage!: LoginPage;
let manageJournalEntryPage!: ManageJournalEntryPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  manageJournalEntryPage = new ManageJournalEntryPage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();
  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Manage Journal Entries Page', async ({ page }) => {
  await manageJournalEntryPage.navigateToManageJournalEntry();
  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  await manageJournalEntryPage.verifyNavigationToManageJournalEntry();
});