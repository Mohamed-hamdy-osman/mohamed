import { test } from '@playwright/test';
import { ManageMoveOrdersSerialPage } from '../../../../../Pages/Supply-Chain/inventory/move-orders/move-order-serial /manage-move-orders-serial';
let pageObj!: ManageMoveOrdersSerialPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  pageObj = new ManageMoveOrdersSerialPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('networkidle');

  console.log(`Test start: ${testInfo.title}`);


});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Move Orders Serial Page', async () => {

  await pageObj.navigateToMoveOrdersSerial();
  await pageObj.verifyNavigationToMoveOrdersSerial();

});