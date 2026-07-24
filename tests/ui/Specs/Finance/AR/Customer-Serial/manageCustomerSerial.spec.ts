import { test } from '@playwright/test';
import { ManageCustomerSerialPage } from '../../../../Pages/Finance/AR/Customer-Serial/manageCustomerSerial';
let manageCustomerSerialPage!: ManageCustomerSerialPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {

  manageCustomerSerialPage = new ManageCustomerSerialPage(page);

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

test('Verify Navigation To Manage Customer Serial', async () => {

  await manageCustomerSerialPage.navigateToManageCustomerSerial();

  await manageCustomerSerialPage.verifyNavigationToManageCustomerSerial();

});