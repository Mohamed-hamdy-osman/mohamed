import { test } from '@playwright/test';
import { ViewSafesPage } from '../../../../Pages/finance/cash-management/safes/view-safes';

let viewSafesPage!: ViewSafesPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

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

  await viewSafesPage.navigateToViewSafes();

  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

  await viewSafesPage.verifyViewSafes();

});