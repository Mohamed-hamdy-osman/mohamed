import { test } from '@playwright/test';
import { ManageSafesPage } from '../../../../Pages/Finance/CashManagement/Safes/manageSafes';

let manageSafesPage!: ManageSafesPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  manageSafesPage = new ManageSafesPage(page);

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

test('Verify Navigation To Manage Safes Page', async ({ page }) => {

  await manageSafesPage.navigateToManageSafes();

  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

  await manageSafesPage.verifyNavigationToManageSafes();

});