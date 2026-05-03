import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ManageMiscTransactionsPage } from '../Pages/manageMiscelliniousTransactions';

let loginPage!: LoginPage;
let miscTransactionsPage!: ManageMiscTransactionsPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  // initialize pages
  loginPage = new LoginPage(page);
  miscTransactionsPage = new ManageMiscTransactionsPage(page);

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

test('Verify Navigation To Manage Miscellaneous Transactions Page', async () => {

  await miscTransactionsPage.navigateToMiscTransactions();

  await miscTransactionsPage.verifyNavigationToMiscTransactions();

});

test('Verify Search With Creation Date From And Creation Date To', async () => {

  await miscTransactionsPage.navigateToMiscTransactions();

  await miscTransactionsPage.creationDateFromAndCreationDateTo();

  await miscTransactionsPage.searchMiscTransactions();

  await miscTransactionsPage.verifySearchResult();

});