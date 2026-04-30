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

test('Create Journal Entry Full Flow (Indexed 🔥)', async ({ page }) => {

  // =========================
  // ✅ Navigate
  // =========================
  await manageJournalEntryPage.navigateToManageJournalEntry();

  // =========================
  // ✅ Open Create Page
  // =========================
  await manageJournalEntryPage.addJournalEntry_btn.click();

  // =========================
  // ✅ HEADER (Static)
  // =========================
  await createJournalEntryPage.enterJournalName();
  await createJournalEntryPage.selectFirstCategory();
  await createJournalEntryPage.selectTodayDate();

  // =========================
  // ✅ LINE 1 (index 0)
  // =========================
  await createJournalEntryPage.clickAddLine();

  await createJournalEntryPage.selectAccountByIndex(0);
  await createJournalEntryPage.enterDebitByIndex(0, '100');

  // =========================
  // ✅ LINE 2 (index 1)
  // =========================
  await createJournalEntryPage.clickAddLine();

  await createJournalEntryPage.selectAccountByIndex(1);
  await createJournalEntryPage.enterCreditByIndex(1, '100');

  // =========================
  // ✅ ASSERT BEFORE SAVE
  // =========================
  await expect(page.locator('table tbody tr')).toHaveCount(2);

  // =========================
  // ✅ SAVE
  // =========================
  await createJournalEntryPage.saveJournalEntry();

  // =========================
  // ✅ ASSERT AFTER SAVE
  // =========================
  await expect(page).toHaveURL(/journal/);
});