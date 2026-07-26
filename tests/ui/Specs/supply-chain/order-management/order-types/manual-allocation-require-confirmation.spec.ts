import { test } from '@playwright/test';
import { OrderTypesPage } from '../../../../Pages/supply-chain/order-management/order-types/manage-order-types';
import { manualAllocationRequireConfirmationOrderTypePage } from '../../../../Pages/supply-chain/order-management/order-types/manual-allocation-require-confirmation';

let orderTypesPage!: OrderTypesPage;
let manualAllocationRequireConfirmationPage!: manualAllocationRequireConfirmationOrderTypePage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {
  orderTypesPage = new OrderTypesPage(page);
  manualAllocationRequireConfirmationPage = new manualAllocationRequireConfirmationOrderTypePage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({ }, testInfo) => {
  console.log(`Test finish: ${testInfo.title} - ${testInfo.status}`);
});

test('Create Order Type with Manual Allocation and Require Confirmation flow', async () => {

  await orderTypesPage.navigateToOrderTypes();

  await orderTypesPage.verifyNavigationToOrderTypes();

  const orderName = await manualAllocationRequireConfirmationPage.createManualAllocationOrderType('Cairo Branch');

  await orderTypesPage.page.getByText(orderName).waitFor({ state: 'visible' });

});