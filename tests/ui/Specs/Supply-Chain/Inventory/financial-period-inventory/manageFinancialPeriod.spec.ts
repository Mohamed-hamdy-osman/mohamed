import { test } from '@playwright/test';
import { ManageFinancialPeriodsPage } from '../../../../Pages/Supply-Chain/inventory/financial-period-inventory/manageFinancialPeriod';

let financialPeriodsPage!: ManageFinancialPeriodsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  financialPeriodsPage = new ManageFinancialPeriodsPage(page);

  await page.goto('/zeta');

  console.log(`Test start: ${testInfo.title}`);


});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Financial Periods Page', async () => {

  await financialPeriodsPage.navigateToFinancialPeriods();
  await financialPeriodsPage.verifyNavigationToFinancialPeriods();

});