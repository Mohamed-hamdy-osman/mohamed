import { test } from '@playwright/test';
import { ManagePositionPage } from '../../../../Pages/HR-Module/Personal/Position/managePosition';

let managePositionPage: ManagePositionPage;

test.describe('Manage Positions Module', () => {

  test.setTimeout(180000); // 3 minutes

  test.beforeEach(async ({ page }) => {
    managePositionPage = new ManagePositionPage(page);

    await test.step('Login and Navigate to Positions', async () => {
await page.goto("/");
      await managePositionPage.navigateToPositions();
    });
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
