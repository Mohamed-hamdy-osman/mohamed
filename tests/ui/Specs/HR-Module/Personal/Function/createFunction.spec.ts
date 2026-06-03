import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/loginPage';
import { ManageFunctionPage } from '../../../../Pages/HR-Module/Personal/Function/manageFunction';
import { CreateFunctionPage } from '../../../../Pages/HR-Module/Personal/Function/createFunction';

let loginPage: LoginPage;
let manageFunctionPage: ManageFunctionPage;
let createFunctionPage: CreateFunctionPage;

test.describe('Create Function Module', () => {

  test.setTimeout(180000); // 3 minutes

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    manageFunctionPage = new ManageFunctionPage(page);
    createFunctionPage = new CreateFunctionPage(page);

    await test.step('Login and Navigate to Functions', async () => {
      await loginPage.goto();
      await loginPage.login('admin@zeta.com', 'P@ssw0rd');
      await loginPage.verifyLoginSuccessWithCorporate(0);
      await manageFunctionPage.navigateToFunctions();
    });
  });

  test('TC01 - Create New Function and Verify', async () => {
    const timestamp = new Date().getTime();
    const funcName = `Function-1-${timestamp}`; // Unique name starting with Function-1

    await test.step('Open Create Dialog', async () => {
      await manageFunctionPage.create_btn.click();
    });

    await test.step('Fill and Save Function', async () => {
      // Filling: Name, Dept Index 0, Cost Center Index 0, Active: true
      await createFunctionPage.fillFunctionDetails(funcName, 0, 0, true);
      await createFunctionPage.saveFunction(funcName);
    });

    await test.step('Search for the Created Function', async () => {
      await manageFunctionPage.searchFunction(funcName);
      await manageFunctionPage.verifySearchResult();
    });
  });

  test('TC02 - Create Inactive Function and Verify', async () => {
    const timestamp = new Date().getTime();
    const funcName = `Function-2-${timestamp}`;

    await test.step('Open Create Dialog', async () => {
      await manageFunctionPage.create_btn.click();
    });

    await test.step('Fill and Save Function as Inactive', async () => {
      // Filling: Name, Dept Index 0, Cost Center Index 0, Active: false
      await createFunctionPage.fillFunctionDetails(funcName, 0, 0, false);
      await createFunctionPage.saveFunction(funcName);
    });

    await test.step('Search for the Created Inactive Function', async () => {
      await manageFunctionPage.searchFunction(funcName);
      await manageFunctionPage.verifySearchResult();
    });
  });

});
