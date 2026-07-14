import { test } from '@playwright/test';
import { ManagePositionPage } from '../../../../Pages/HR-Module/Personal/Position/managePosition';

let managePositionPage: ManagePositionPage;

test.describe('Manage Positions Module', () => {

  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    managePositionPage = new ManagePositionPage(page);

      await page.goto('/zeta/choose-module');
  await page.waitForLoadState('networkidle');
      await managePositionPage.navigateToPositions();
  });

  test('TC01 - Verify Navigation to Manage Positions', async () => {
    await managePositionPage.verifyNavigationToManagePositions();
  });

  test('TC02 - Search Position by Name', async () => {
    await managePositionPage.searchPosition();
    await managePositionPage.verifySearchResult();
  });

  test('TC03 - Clear Search Filters', async () => {
    await managePositionPage.searchPosition('NonExistentPosition');
    await managePositionPage.clearFilters();
    await managePositionPage.verifySearchResult();
  });

});
