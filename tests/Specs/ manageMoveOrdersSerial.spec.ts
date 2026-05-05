 import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ManageMoveOrdersSerialPage } from '../Pages/ manageMoveOrdersSerial';

let loginPage!: LoginPage;
let pageObj!: ManageMoveOrdersSerialPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  pageObj = new ManageMoveOrdersSerialPage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Move Orders Serial Page', async () => {

  await pageObj.navigateToMoveOrdersSerial();
  await pageObj.verifyNavigationToMoveOrdersSerial();

});