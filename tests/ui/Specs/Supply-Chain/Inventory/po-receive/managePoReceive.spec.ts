import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManagePOReceivePage } from '../../../../Pages/Supply-Chain/inventory/po-receive/managePoReceive';
let loginPage!: LoginPage;
let poReceivePage!: ManagePOReceivePage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  poReceivePage = new ManagePOReceivePage(page);

  console.log(`Test start: ${testInfo.title}`);
await loginPage.navigateToApp();

});
test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Manage PO Receive Page', async () => {
  await poReceivePage.navigateToPOReceive();
  await poReceivePage.verifyNavigationToPOReceive();
});
