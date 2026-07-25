import { test } from '@playwright/test';
import { ManagePositionPage } from '../../../../Pages/hr/personal/position/manage-position';
import { CreatePositionPage } from '../../../../Pages/hr/personal/position/create-position';

let managePositionPage: ManagePositionPage;
let createPositionPage: CreatePositionPage;

test.describe('Create Position Module', () => {

  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    managePositionPage = new ManagePositionPage(page);
    createPositionPage = new CreatePositionPage(page);

      await page.goto('/zeta/choose-module');
  await page.waitForLoadState('networkidle');
      await managePositionPage.navigateToPositions();
  });

  test('TC01 - Create New Position and Verify', async () => {
    const timestamp = new Date().getTime();
    const posName = `Position-1-${timestamp}`;

    await test.step('Open Create Dialog', async () => {
      await managePositionPage.create_btn.click();
    });

    await test.step('Fill and Save Position', async () => {
      await createPositionPage.fillPositionDetails(posName, 1, 1, 1, true);
      await createPositionPage.savePosition(posName);
    });

    await test.step('Search for the Created Position', async () => {
      await managePositionPage.searchPosition(posName);
      await managePositionPage.verifySearchResult();
    });
  });

  test('TC02 - Create Inactive Position and Verify', async () => {
    const timestamp = new Date().getTime();
    const posName = `Position-2-${timestamp}`;

    await test.step('Open Create Dialog', async () => {
      await managePositionPage.create_btn.click();
    });

    await test.step('Fill and Save Position as Inactive', async () => {
      await createPositionPage.fillPositionDetails(posName, 1, 1, 1, false);
      await createPositionPage.savePosition(posName);
    });

    await test.step('Search for the Created Inactive Position', async () => {
      await managePositionPage.searchPosition(posName);
      await managePositionPage.verifySearchResult();
    });
  });

});
