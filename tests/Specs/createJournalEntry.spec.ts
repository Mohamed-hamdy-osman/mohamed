import { test, expect } from '@playwright/test';

import { LoginPage } from '../Pages/loginPage';
import { ManageJournalEntryPage } from '../Pages/manageJournalEntry';
import { CreateJournalEntryPage } from '../Pages/createJournalEntry';

let loginPage: LoginPage;
let manageJournalEntryPage: ManageJournalEntryPage;
let createJournalEntryPage: CreateJournalEntryPage;

test.setTimeout(90000);

test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);
  manageJournalEntryPage = new ManageJournalEntryPage(page);
  createJournalEntryPage = new CreateJournalEntryPage(page);

  // ✅ Login
  await loginPage.goto();
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();
});

test('Create Journal Entry Header + Add Line', async ({ page }) => {

  // =========================
  // ✅ Navigate
  // =========================
  await manageJournalEntryPage.navigateToManageJournalEntry();

  // =========================
  // ✅ Open Create Page
  // =========================
  await manageJournalEntryPage.addJournalEntry_btn.click();

  // =========================
  // ✅ HEADER
  // =========================
  await createJournalEntryPage.enterJournalName();
  await createJournalEntryPage.selectFirstCategory();
  await createJournalEntryPage.selectTodayDate();

  // =========================
  // ✅ ACTION
  // =========================
  await createJournalEntryPage.clickAddLine();

  // =========================
  // ✅ ASSERTION
  // =========================
  await expect(page.locator('table tbody tr')).toHaveCount(1);
  await expect(page.getByText('Select Account').first()).toBeVisible();
});