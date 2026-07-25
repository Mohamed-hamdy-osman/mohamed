import { test } from '@playwright/test';
import { ManageCustomersPage } from '../../../../Pages/finance/account-receivable/customers/manage-customers';

let manageCustomersPage!: ManageCustomersPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {

  manageCustomersPage = new ManageCustomersPage(page);

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

test('Verify Navigation To Manage Customers', async () => {

  await manageCustomersPage.navigateToManageCustomers();

  await manageCustomersPage.verifyNavigationToManageCustomers();

});