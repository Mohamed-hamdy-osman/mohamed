import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ManageMiscTransactionsPage } from '../Pages/manageMiscelliniousTransactions';
import { CreateMiscellaneousReceiptPage } from '../Pages/createMiscllaneousReceipt';

let loginPage!: LoginPage;
let miscPage!: ManageMiscTransactionsPage;
let createMiscReceiptPage!: CreateMiscellaneousReceiptPage;

test.setTimeout(90000);

test.beforeEach(async ({ page }, testInfo) => {

  // initialize pages
  loginPage = new LoginPage(page);
  miscPage = new ManageMiscTransactionsPage(page);
  createMiscReceiptPage = new CreateMiscellaneousReceiptPage(page);

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

test('Create Miscellaneous Receipt Flow', async () => {

  await createMiscReceiptPage.createMiscReceipt();

});