import { test } from '@playwright/test';
import { ManageMoveOrdersPage } from '../../../../../Pages/Supply-Chain/inventory/move-orders/manage-move-order/manageMoveOrders';
let moveOrdersPage!: ManageMoveOrdersPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  moveOrdersPage = new ManageMoveOrdersPage(page);

  console.log(`Test start: ${testInfo.title}`);

await page.goto("/");

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Move Orders Page', async () => {

  await moveOrdersPage.navigateToMoveOrders();
  await moveOrdersPage.verifyNavigationToMoveOrders();

});

