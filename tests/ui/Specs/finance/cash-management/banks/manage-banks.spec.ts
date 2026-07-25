import { test } from '@playwright/test';
import { ManageBanksPage } from '../../../../Pages/finance/CashManagement/Banks/manageBanks';

let manageBanksPage!: ManageBanksPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  manageBanksPage = new ManageBanksPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);

  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
});

test.afterEach(async ({ page }, testInfo) => {

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Manage Banks Page', async ({ page }) => {

  await manageBanksPage.navigateToManageBanks();

  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

  await manageBanksPage.verifyNavigationToManageBanks();

});