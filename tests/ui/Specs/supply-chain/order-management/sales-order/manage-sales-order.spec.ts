import { test } from '@playwright/test';
import { SalesOrdersPage } from '../../../../Pages/supply-chain/order-management/sales-order/manage-sales-order';

let salesOrdersPage!: SalesOrdersPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  salesOrdersPage = new SalesOrdersPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({ page }, testInfo) => {
  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Sales Orders Page', async () => {
  await salesOrdersPage.navigateToSalesOrders();
  await salesOrdersPage.verifyNavigationToSalesOrders();
});
