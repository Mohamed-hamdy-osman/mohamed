import { test } from '@playwright/test';
import { ManageTransactOrdersPage } from '../../../../../Pages/Supply-Chain/inventory/move-orders/manage-transact-move-order/manageTransactMoveOrders';

let transactPage!: ManageTransactOrdersPage;

test.beforeEach(async ({ page }) => {

  transactPage = new ManageTransactOrdersPage(page);

  await page.goto("/");

});

test('Verify Navigation Transact Orders', async () => {

  await transactPage.navigateToTransactOrders();
  await transactPage.verifyNavigationToTransactOrders();

});