import { test } from '@playwright/test';

import { ManageJournalEntryPage } from '../../../Pages/Finance/GL/manageJournalEntry';
import { CreateJournalEntryPage } from '../../../Pages/Finance/GL/createJournalEntry';


let manageJournalEntryPage: ManageJournalEntryPage;
let createJournalEntryPage: CreateJournalEntryPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }) => {


  manageJournalEntryPage =
    new ManageJournalEntryPage(page);

  createJournalEntryPage =
    new CreateJournalEntryPage(page);

  await page.goto('/zeta');



});

// test('Verify Create And Post Journal Entry', async () => {
//   await manageJournalEntryPage.navigateToManageJournalEntry();
//   await createJournalEntryPage.clickAddJournalEntry();
//   await createJournalEntryPage.enterJournalName(0);
//   await createJournalEntryPage.selectFirstCategory(0);
//   await createJournalEntryPage.selectTodayDate(0);
//   await createJournalEntryPage.clickAddLine(0);
//   await createJournalEntryPage.selectFirstAccount(0, 0); // DR
//   await createJournalEntryPage.enterDrValue(0, '1000');
//   await