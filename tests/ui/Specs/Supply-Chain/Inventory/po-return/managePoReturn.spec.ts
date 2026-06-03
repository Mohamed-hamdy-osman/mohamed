import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManagePOReturnPage } from '../../../../Pages/Supply-Chain/inventory/po-return/managePoReturn';

let loginPage!: LoginPage;
let poReturnPage!: ManagePOReturnPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  poReturnPage = new ManagePOReturnPage(page);

  console.log(`Test start: ${testInfo.title}`);

await loginPage.navigateToApp();
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