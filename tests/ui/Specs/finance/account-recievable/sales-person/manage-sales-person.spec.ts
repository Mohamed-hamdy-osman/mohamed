import { test } from '@playwright/test';
import { ManageSalesPersonPage } from '../../../../Pages/finance/AR/Sales-Person/manageSalesPerson';
let manageSalesPersonPage!: ManageSalesPersonPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {

  manageSalesPersonPage = new ManageSalesPersonPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);

  await page.locator('.loader-wrapper').waitFor({
    state: 'hidden'
  });
});

test.afterEach(async ({ page }, testInfo) => {

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Manage Sales Person', async () => {

  await manageSalesPersonPage.navigateToManageSalesPerson();

  await manageSalesPersonPage.verifyNavigationToManageSalesPerson();

});