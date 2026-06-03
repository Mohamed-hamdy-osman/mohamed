import { test } from '@playwright/test';
import { LoginPage } from '../../../../../Pages/Login/loginPage';
import { ManageMoveOrdersSerialPage } from '../../../../../Pages/Supply-Chain/inventory/move-orders/move-order-serial /manageMoveOrdersSerial';
let loginPage!: LoginPage;
let pageObj!: ManageMoveOrdersSerialPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  pageObj = new ManageMoveOrdersSerialPage(page);

  console.log(`Test start: ${testInfo.title}`);

await loginPage.navigateToApp();

});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Move Orders Serial Page', async () => {

  await pageObj.navigateToMoveOrdersSerial();
  await pageObj.verifyNavigationToMoveOrdersSerial();

});