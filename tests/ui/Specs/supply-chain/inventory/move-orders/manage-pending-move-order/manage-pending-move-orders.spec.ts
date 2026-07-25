import { test } from '@playwright/test';
import { ManagePendingMoveOrdersPage } from '../../../../../Pages/Supply-Chain/inventory/move-orders/manage-pending-move-order/manage-pending-moveOrders';

let pendingPage!: ManagePendingMoveOrdersPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }) => {

  pendingPage = new ManagePendingMoveOrdersPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');
});

test('Verify Navigation Pending Move Orders', async () => {

  await pendingPage.navigateToPendingMoveOrders();
  await pendingPage.verifyNavigationToPendingMoveOrders();

});