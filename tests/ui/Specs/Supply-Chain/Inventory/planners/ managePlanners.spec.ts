import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManagePlannersPage } from '../../../../Pages/Supply-Chain/inventory/planners/ managePlanners';

let loginPage!: LoginPage;
let plannersPage!: ManagePlannersPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  plannersPage = new ManagePlannersPage(page);

  console.log(`Test start: ${testInfo.title}`);

await loginPage.navigateToApp();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Planners Page', async () => {

  await plannersPage.navigateToPlanners();
  await plannersPage.verifyNavigationToPlanners();

});