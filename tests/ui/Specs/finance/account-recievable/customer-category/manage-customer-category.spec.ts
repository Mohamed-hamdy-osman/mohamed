import { test } from '@playwright/test';
import { ManageCustomerCategoryPage } from '../../../../Pages/finance/AR/Customer-Category/manageCustomerCategory';
let manageCustomerCategoryPage!: ManageCustomerCategoryPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {

  manageCustomerCategoryPage = new ManageCustomerCategoryPage(page);

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

test('Verify Navigation To Manage Customer Category', async () => {

  await manageCustomerCategoryPage.navigateToManageCustomerCategory();

  await manageCustomerCategoryPage.verifyNavigationToManageCustomerCategory();

});