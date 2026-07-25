import { test } from '@playwright/test';
import { ManagePickingRulesConfigurationsPage } from '../../../../Pages/Supply-Chain/inventory/picking-rules/ manage-picking-rules-configurations';


let pickingRulesPage!: ManagePickingRulesConfigurationsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  pickingRulesPage = new ManagePickingRulesConfigurationsPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('networkidle');

  console.log(`Test start: ${testInfo.title}`);


});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Picking Rules Configurations Page', async () => {

  await pickingRulesPage.navigateToPickingRulesConfigurations();
  await pickingRulesPage.verifyNavigationToPickingRulesConfigurations();

});