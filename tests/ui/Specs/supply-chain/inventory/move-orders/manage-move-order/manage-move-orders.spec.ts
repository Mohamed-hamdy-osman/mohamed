import { test } from '@playwright/test';
import { ManageMoveOrdersPage } from '../../../../../Pages/Supply-Chain/inventory/move-orders/manage-move-order/manageMoveOrders';
let moveOrdersPage!: ManageMoveOrdersPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  moveOrdersPage = new ManageMoveOrdersPage(page);

  await page.goto('/zeta/choose-module');
await page.waitForLoadState('load');
  console.log(`Test start: ${testInfo.title}`);


});

test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
    console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Move Orders Page', async () => {

  await moveOrdersPage.navigateToMoveOrders();
  await moveOrdersPage.verifyNavigationToMoveOrders();

});

