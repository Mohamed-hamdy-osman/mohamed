import { test } from '@playwright/test';
import { ManagePickingRulesConfigurationsPage } from '../../../../Pages/Supply-Chain/inventory/picking-rules/ managePickingRulesConfigurations';


let pickingRulesPage!: ManagePickingRulesConfigurationsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  pickingRulesPage = new ManagePickingRulesConfigurationsPage(page);

  console.log(`Test start: ${testInfo.title}`);

await page.goto("/");

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Picking Rules Configurations Page', async () => {

  await pickingRulesPage.navigateToPickingRulesConfigurations();
  await pickingRulesPage.verifyNavigationToPickingRulesConfigurations();

});