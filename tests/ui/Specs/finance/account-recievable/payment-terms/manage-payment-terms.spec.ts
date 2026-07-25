import { test } from '@playwright/test';
import { ManagePaymentTermsPage } from '../../../../Pages/finance/AR/Payment-Terms/managePaymentTerms';

let managePaymentTermsPage!: ManagePaymentTermsPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {

  managePaymentTermsPage = new ManagePaymentTermsPage(page);

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

test('Verify Navigation To Manage Payment Terms', async () => {

  await managePaymentTermsPage.navigateToManagePaymentTerms();

  await managePaymentTermsPage.verifyNavigationToManagePaymentTerms();

});
