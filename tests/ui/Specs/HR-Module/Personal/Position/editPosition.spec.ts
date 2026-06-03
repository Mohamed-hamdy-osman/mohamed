import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManagePositionPage } from '../../../../Pages/HR-Module/Personal/Position/managePosition';
import { CreatePositionPage } from '../../../../Pages/HR-Module/Personal/Position/createPosition';

let loginPage: LoginPage;
let managePositionPage: ManagePositionPage;
let createPositionPage: CreatePositionPage;

test.describe('Edit Position Module', () => {

  test.setTimeout(180000); // 3 minutes

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    managePositionPage = new ManagePositionPage(page);
    createPositionPage = new CreatePositionPage(page);

    await test.step('Login and Navigate to Positions', async () => {
await loginPage.navigateToApp();
      await managePositionPage.navigateToPositions();
    });
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
