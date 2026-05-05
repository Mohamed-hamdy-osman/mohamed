import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ManagePOReturnPage } from '../Pages/managePoReturn'; 

let loginPage!: LoginPage;
let poReturnPage!: ManagePOReturnPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  // initialize pages
  loginPage = new LoginPage(page);
  poReturnPage = new ManagePOReturnPage(page);

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

test('Verify Navigation To Manage PO Return Page', async () => {

  await poReturnPage.navigateToPOReturn();

  await poReturnPage.verifyNavigationToPOReturn();

});

test('Verify Search With Creation Date From And Creation Date To', async () => {

  await poReturnPage.navigateToPOReturn();

  await poReturnPage.creationDateFromAndCreationDateTo();

  await poReturnPage.searchPOReturn();

  await poReturnPage.verifySearchResult();

});