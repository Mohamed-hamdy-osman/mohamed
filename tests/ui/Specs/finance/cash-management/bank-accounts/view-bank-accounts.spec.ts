import { test } from '@playwright/test';
import { ViewBankAccountPage } from '../../../../Pages/finance/cash-management/bank-accounts/view-bank-accounts';

let viewBankAccountPage!: ViewBankAccountPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  viewBankAccountPage = new ViewBankAccountPage(page);

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

test('Verify View Bank Account', async ({ page }) => {

  await viewBankAccountPage.navigateToViewBankAccount();

  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

  await viewBankAccountPage.verifyViewBankAccount();

});