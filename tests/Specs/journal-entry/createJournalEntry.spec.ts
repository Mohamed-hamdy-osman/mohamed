import { test } from '@playwright/test';

import { LoginPage }
from '../../Pages/login/loginPage';

import { ManageJournalEntryPage }
from '../../Pages/journal-entry/manageJournalEntry';

import { CreateJournalEntryPage }
from '../../Pages/journal-entry/createJournalEntry';

let loginPage: LoginPage;

let manageJournalEntryPage:
ManageJournalEntryPage;

let createJournalEntryPage:
CreateJournalEntryPage;

test.setTimeout(90000);

test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);

  manageJournalEntryPage =
    new ManageJournalEntryPage(page);

  createJournalEntryPage =
    new CreateJournalEntryPage(page);

  await loginPage.goto();

  await loginPage.login(
    'admin@zeta.com',
    'P@ssw0rd'
  );

  await loginPage
    .verifyLoginSuccessWithCorporate();
});


test(
  'Create Journal Entry Full Flow',

  async ({ page }) => {

    await manageJournalEntryPage
      .navigateToManageJournalEntry();

    await manageJournalEntryPage
      .addJournalEntry_btn
      .click();

    await createJournalEntryPage
      .enterJournalName();

    await createJournalEntryPage
      .selectFirstCategory();

    await createJournalEntryPage
      .selectTodayDate();

    await createJournalEntryPage
      .clickAddLine();

    await createJournalEntryPage
      .selectFirstAccount(0, 0);

    await createJournalEntryPage
      .enterDrValue(0, '1');

    await createJournalEntryPage
      .clickAddLine();

    await createJournalEntryPage
      .selectFirstAccount(1, 1);

    await createJournalEntryPage
      .enterCrValue(1, '1');

    await createJournalEntryPage
      .clickSave();

    await createJournalEntryPage
      .clickEditButton();

    await createJournalEntryPage
      .clickPostButton();

    await page.goBack();

    await page.waitForLoadState('networkidle');

    await createJournalEntryPage
      .assertJournalIsPosted();

  }

);