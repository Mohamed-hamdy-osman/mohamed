import { test } from '@playwright/test';
import { PendingSalesOrdersPage } from '../../../../Pages/supply-chain/order-management/pending-sales-order/manage-pending-sales-order';
let pendingSalesOrdersPage!: PendingSalesOrdersPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  pendingSalesOrdersPage = new PendingSalesOrdersPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({ }, testInfo) => {
  console.log(`Test finish: ${testInfo.title} - ${testInfo.status}`);
});

test('Verify Search Pending Sales Orders', async () => {

  await pendingSalesOrdersPage.navigateToPendingSalesOrders();

  await pendingSalesOrdersPage.verifyNavigationToPendingSalesOrders();

  await pendingSalesOrdersPage.creationDateFromAndCreationDateTo();

  await pendingSalesOrdersPage.searchPendingSalesOrders();

  await pendingSalesOrdersPage.verifySearchResult();

});