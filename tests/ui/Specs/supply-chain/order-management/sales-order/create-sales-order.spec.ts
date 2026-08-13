import { test } from '@playwright/test';

import { SalesOrdersPage } from '../../../../Pages/supply-chain/order-management/sales-order/manage-sales-order';
import { CreateSalesOrderPage } from '../../../../Pages/supply-chain/order-management/sales-order/create-sales-order';

let salesOrdersPage!: SalesOrdersPage;

test.setTimeout(180000);

test.beforeEach(async ({ page }, testInfo) => {
  salesOrdersPage = new SalesOrdersPage(page);
  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');
  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({ }, testInfo) => {
  console.log(`Test end: ${testInfo.title} - ${testInfo.status}`);
});

test('Create Sales Order - Auto Transact flow', async ({ page }) => {
  await salesOrdersPage.navigateToSalesOrders();
  await salesOrdersPage.verifyNavigationToSalesOrders();
  const createSalesOrderPage = new CreateSalesOrderPage(page);
  await createSalesOrderPage.createOrder({
  orderType: 'Auto Transact',
  customerCode: '1',
  quantity: '1',
  });
});