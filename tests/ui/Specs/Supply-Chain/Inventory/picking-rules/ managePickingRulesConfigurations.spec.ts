import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManagePickingRulesConfigurationsPage } from '../../../../Pages/Supply-Chain/inventory/picking-rules/ managePickingRulesConfigurations';


let loginPage!: LoginPage;
let pickingRulesPage!: ManagePickingRulesConfigurationsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  pickingRulesPage = new ManagePickingRulesConfigurationsPage(page);

  console.log(`Test start: ${testInfo.title}`);

await loginPage.navigateToApp();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Picking Rules Configurations Page', async () => {

  await pickingRulesPage.navigateToPickingRulesConfigurations();
  await pickingRulesPage.verifyNavigationToPickingRulesConfigurations();

});