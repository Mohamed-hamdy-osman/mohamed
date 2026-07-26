import { test } from '@playwright/test';
import { SalesOrdersFulfillmentPage } from '../../../../Pages/supply-chain/order-management/sales-order-fulfillment/manage-sales-order-fulfillment';

let salesOrdersFulfillmentPage!: SalesOrdersFulfillmentPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  salesOrdersFulfillmentPage = new SalesOrdersFulfillmentPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({ }, testInfo) => {
  console.log(`Test finish: ${testInfo.title} - ${testInfo.status}`);
});

test('Verify Search Sales Orders Fulfillment', async () => {

  await salesOrdersFulfillmentPage.navigateToSalesOrdersFulfillment();

  await salesOrdersFulfillmentPage.verifyNavigationToSalesOrdersFulfillment();

  await salesOrdersFulfillmentPage.creationDateFromAndCreationDateTo();

  await salesOrdersFulfillmentPage.searchSalesOrdersFulfillment();

  await salesOrdersFulfillmentPage.verifySearchResult();

});