import { test } from '@playwright/test';
import { ManagePositionPage } from '../../../../Pages/hr/personal/position/manage-position';
import { CreatePositionPage } from '../../../../Pages/hr/personal/position/create-position';

let managePositionPage: ManagePositionPage;
let createPositionPage: CreatePositionPage;

test.describe('Edit Position Module', () => {

  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    managePositionPage = new ManagePositionPage(page);
    createPositionPage = new CreatePositionPage(page);

      await page.goto('/zeta/choose-module');
  await page.waitForLoadState('networkidle');
      await managePositionPage.navigateToPositions();
  });

  test('TC01 - Create then Edit Position and Check Backend Response', async () => {
    
    const timestamp = new Date().getTime();
    const posName = `Position-3-${timestamp}`;
    const updatedPosName = `Position-3-Updated-${timestamp}`;

    await test.step('Create Position First', async () => {
        await managePositionPage.create_btn.click();
        await createPositionPage.fillPositionDetails(posName, 1, 1, 1, true);
        await createPositionPage.savePosition(posName);
    });

    await test.step('Search for the Created Position', async () => {
        await managePositionPage.searchPosition(posName);
        await managePositionPage.verifySearchResult();
    });

    await test.step('Click Edit Button', async () => {
        await managePositionPage.edit_btn.first().click();
    });

    await test.step('Update Position Details and Toggle to Inactive', async () => {
        await createPositionPage.positionName_textbox.clear();
        await createPositionPage.fillPositionDetails(updatedPosName, 1, 1, 1, false);
    });

    await createPositionPage.savePositionWithResponse(updatedPosName);

  });

});
