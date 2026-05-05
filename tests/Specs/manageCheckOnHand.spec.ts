import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ManageCheckOnHandPage } from '../Pages/manageCheckOnHand';

let loginPage!: LoginPage;
let checkOnHandPage!: ManageCheckOnHandPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  // initialize pages
  loginPage = new LoginPage(page);
  checkOnHandPage = new ManageCheckOnHandPage(page);

  // open system
  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  // login
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');

  // verify login
  await loginPage.verifyLoginSuccessWithCorporate();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Check-On Hand Page', async () => {

  await checkOnHandPage.navigateToCheckOnHand();

});

test('Verify Click On Check Button', async () => {

  await checkOnHandPage.navigateToCheckOnHand();

  await checkOnHandPage.clickCheckButton();

});