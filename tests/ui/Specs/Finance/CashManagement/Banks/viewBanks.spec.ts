import { test } from '@playwright/test';
import { ViewBankPage } from '../../../../Pages/Finance/CashManagement/Banks/viewBanks';

let viewBankPage!: ViewBankPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  viewBankPage = new ViewBankPage(page);

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

test('Verify View Bank', async ({ page }) => {

  await viewBankPage.navigateToViewBank();

  await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

  await viewBankPage.verifyViewBank();

});