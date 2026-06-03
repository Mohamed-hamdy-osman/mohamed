import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManageFunctionPage } from '../../../../Pages/HR-Module/Personal/Function/manageFunction';
import { CreateFunctionPage } from '../../../../Pages/HR-Module/Personal/Function/createFunction';

let loginPage: LoginPage;
let manageFunctionPage: ManageFunctionPage;
let createFunctionPage: CreateFunctionPage;

test.describe('Edit Function Module', () => {

  test.setTimeout(180000); // 3 minutes

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    manageFunctionPage = new ManageFunctionPage(page);
    createFunctionPage = new CreateFunctionPage(page);

    await test.step('Login and Navigate to Functions', async () => {
await loginPage.navigateToApp();
      await manageFunctionPage.navigateToFunctions();
    });
  });

  test('TC01 - Create then Edit Function and Check Backend Response', async () => {
    
    const timestamp = new Date().getTime();
    const funcName = `Function-3-${timestamp}`;
    const updatedFuncName = `Function-3-Updated-${timestamp}`;

    await test.step('Create Function First', async () => {
        await manageFunctionPage.create_btn.click();
        await createFunctionPage.fillFunctionDetails(funcName, 0, 0, true);
        await createFunctionPage.saveFunction(funcName);
    });

    await test.step('Search for the Created Function', async () => {
        await manageFunctionPage.searchFunction(funcName);
        await manageFunctionPage.verifySearchResult();
    });

    await test.step('Click Edit Button', async () => {
        await manageFunctionPage.edit_btn.first().click();
    });

    await test.step('Update Function Details and Toggle to Inactive', async () => {
        await createFunctionPage.functionName_textbox.clear();
        await createFunctionPage.fillFunctionDetails(updatedFuncName, 0, 0, false);
    });

    // This method checks for response code 200 and logs the JSON body
    await createFunctionPage.saveFunctionWithResponse(updatedFuncName);

  });

});
