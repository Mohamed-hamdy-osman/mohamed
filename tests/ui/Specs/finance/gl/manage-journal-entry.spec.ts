import { test } from '@playwright/test';
import { ManageJournalEntryPage } from '../../../Pages/finance/GL/manageJournalEntry';


let manageJournalEntryPage!: ManageJournalEntryPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  manageJournalEntryPage = new ManageJournalEntryPage(page);

  await page.goto('/zeta/choose-module');
await page.waitForLoadState('load');
  console.log(`Test start: ${testInfo.title}`);
  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
});

test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
    console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Manage Journal Entries Page', async ({ page }) => {
  await manageJournalEntryPage.navigateToManageJournalEntry();
  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  await manageJournalEntryPage.verifyNavigationToManageJournalEntry();
});