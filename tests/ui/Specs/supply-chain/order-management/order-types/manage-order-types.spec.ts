import { test } from '@playwright/test';
import { OrderTypesPage } from '../../../../Pages/supply-chain/order-management/order-types/manage-order-types';

let orderTypesPage!: OrderTypesPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
  orderTypesPage = new OrderTypesPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({ }, testInfo) => {
  console.log(`Test finish: ${testInfo.title} - ${testInfo.status}`);
});

test('Verify Search Order Types', async () => {

  await orderTypesPage.navigateToOrderTypes();

  await orderTypesPage.verifyNavigationToOrderTypes();

  await orderTypesPage.creationDateFromAndCreationDateTo();

  await orderTypesPage.searchOrderTypes();

  await orderTypesPage.verifySearchResult();

});