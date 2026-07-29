import { test } from '@playwright/test';
import { ManageSafesPage } from '../../../../Pages/finance/cash-management/safes/manage-safes';
import { ViewSafesPage } from '../../../../Pages/finance/cash-management/safes/view-safes';

let manageSafesPage!: ManageSafesPage;
let viewSafesPage!: ViewSafesPage;
test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  manageSafesPage = new ManageSafesPage(page);
  viewSafesPage = new ViewSafesPage(page);
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

test('Verify View Safes', async ({ page }) => {

  await manageSafesPage.navigateToManageSafes();

  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

  await viewSafesPage.navigateToViewSafes();

});