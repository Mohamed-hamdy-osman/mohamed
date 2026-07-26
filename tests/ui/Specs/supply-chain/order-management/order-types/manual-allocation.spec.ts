import { test } from '@playwright/test';
import { OrderTypesPage } from '../../../../Pages/supply-chain/order-management/order-types/manage-order-types';
import { manualAllocationOrderTypePage } from '../../../../Pages/supply-chain/order-management/order-types/manual-allocation';

let orderTypesPage!: OrderTypesPage;
let manualAllocationPage!: manualAllocationOrderTypePage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {
  orderTypesPage = new OrderTypesPage(page);
  manualAllocationPage = new manualAllocationOrderTypePage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({ }, testInfo) => {
  console.log(`Test finish: ${testInfo.title} - ${testInfo.status}`);
});

test('Create Order Type with Manual Allocation flow', async () => {

  await orderTypesPage.navigateToOrderTypes();

  await orderTypesPage.verifyNavigationToOrderTypes();

  const orderName = await manualAllocationPage.createManualAllocationOrderType('Cairo Branch');

  await orderTypesPage.page.getByText(orderName).waitFor({ state: 'visible' });

});
