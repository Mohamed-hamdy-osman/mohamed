import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ManageMiscTransactionsPage } from '../Pages/manageMiscelliniousTransactions';
import { CreateMiscellaneousIssuePage } from '../Pages/createMiscelliniousIssue';
let loginPage!: LoginPage;
let miscPage!: ManageMiscTransactionsPage;
let createMiscIssuePage!: CreateMiscellaneousIssuePage;

test.setTimeout(90000);

test.beforeEach(async ({ page }, testInfo) => {

  // initialize pages
  loginPage = new LoginPage(page);
  miscPage = new ManageMiscTransactionsPage(page);
  createMiscIssuePage = new CreateMiscellaneousIssuePage(page);

  // open system
  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  // login
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');

  // verify login + enter corporate
  await loginPage.verifyLoginSuccessWithCorporate();

  // navigate to Misc Transactions
  await miscPage.navigateToMiscTransactions();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Create Miscellaneous Issue Flow', async () => {

  await createMiscIssuePage.createMiscIssue();

});