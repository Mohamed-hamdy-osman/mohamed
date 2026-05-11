import { test } from '@playwright/test';
import { LoginPage } from '../../Pages/login/loginPage';
import { ManageUnitOfMeasurePage } from '../../Pages/uom-inventory/ manageUnitOfMeasure';

let loginPage!: LoginPage;
let unitPage!: ManageUnitOfMeasurePage;
test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  unitPage = new ManageUnitOfMeasurePage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Unit Of Measure Page', async () => {

  await unitPage.navigateToUnitOfMeasure();
  await unitPage.verifyNavigationToUnitOfMeasure();

});