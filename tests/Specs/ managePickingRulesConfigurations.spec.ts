import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ManagePickingRulesConfigurationsPage } from '../Pages/ managePickingRulesConfigurations';

let loginPage!: LoginPage;
let pickingRulesPage!: ManagePickingRulesConfigurationsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  pickingRulesPage = new ManagePickingRulesConfigurationsPage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Picking Rules Configurations Page', async () => {

  await pickingRulesPage.navigateToPickingRulesConfigurations();
  await pickingRulesPage.verifyNavigationToPickingRulesConfigurations();

});