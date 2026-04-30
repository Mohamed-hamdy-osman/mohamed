import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ManagePOReceivePage } from '../Pages/managePoReceive';
let loginPage!: LoginPage;
let poReceivePage!: ManagePOReceivePage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  // initialize pages
  loginPage = new LoginPage(page);
  poReceivePage = new ManagePOReceivePage(page);

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

test('Verify Navigation To Manage PO Receive Page', async () => {

  await poReceivePage.navigateToPOReceive();

  await poReceivePage.verifyNavigationToPOReceive();

});

test('Verify Search With Creation Date From And Creation Date To', async () => {

  await poReceivePage.navigateToPOReceive();

  await poReceivePage.creationDateFromAndCreationDateTo();

  await poReceivePage.searchPOReceive();

  await poReceivePage.verifySearchResult();

});