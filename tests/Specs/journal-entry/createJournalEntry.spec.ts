import { test, expect } from '@playwright/test';

import { LoginPage } from '../../Pages/login/loginPage';
import { ManageJournalEntryPage } from '../../Pages/journal-entry/manageJournalEntry';
import { CreateJournalEntryPage } from '../../Pages/journal-entry/createJournalEntry';


let loginPage: LoginPage;
let manageJournalEntryPage: ManageJournalEntryPage;
let createJournalEntryPage: CreateJournalEntryPage;

test.setTimeout(90000);

test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);
  manageJournalEntryPage = new ManageJournalEntryPage(page);
  createJournalEntryPage = new CreateJournalEntryPage(page);

  await loginPage.goto();
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();
});

test('Create Journal Entry Header + Add Line', async ({ page }) => {
  await manageJournalEntryPage.navigateToManageJournalEntry();
  await manageJournalEntryPage.addJournalEntry_btn.click();
  await createJournalEntryPage.enterJournalName();
  await createJournalEntryPage.selectFirstCategory();
  await createJournalEntryPage.selectTodayDate();
  await createJournalEntryPage.clickAddLine();
  await expect(page.locator('table tbody tr')).toHaveCount(1);
  await expect(page.getByText('Select Account').first()).toBeVisible();
});