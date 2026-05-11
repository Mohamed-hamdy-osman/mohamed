import { test } from '@playwright/test';
import { LoginPage } from '../../Pages/login/loginPage';
import { ManageFinancialPeriodsPage } from '../../Pages/financial-period-inventory/manageFinancialPeriod';

let loginPage!: LoginPage;
let financialPeriodsPage!: ManageFinancialPeriodsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  financialPeriodsPage = new ManageFinancialPeriodsPage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Financial Periods Page', async () => {

  await financialPeriodsPage.navigateToFinancialPeriods();
  await financialPeriodsPage.verifyNavigationToFinancialPeriods();

});