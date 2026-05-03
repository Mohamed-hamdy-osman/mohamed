import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ManagePOInspectionPage } from '../Pages/managePoInspection';
let loginPage!: LoginPage;
let poInspectionPage!: ManagePOInspectionPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  // initialize pages
  loginPage = new LoginPage(page);
  poInspectionPage = new ManagePOInspectionPage(page);

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

test('Verify Navigation To Manage PO Inspection Page', async () => {

  await poInspectionPage.navigateToPOInspection();

  await poInspectionPage.verifyNavigationToPOInspection();

});

test('Verify Search With Creation Date From And Creation Date To', async () => {

  await poInspectionPage.navigateToPOInspection();

  await poInspectionPage.creationDateFromAndCreationDateTo();

  await poInspectionPage.searchPOInspection();

  await poInspectionPage.verifySearchResult();

});