import { test } from '@playwright/test';
import { OrderTypesPage } from '../../../../Pages/supply-chain/order-management/order-types/manage-order-types';
import { autoReservationOrderTypePage } from '../../../../Pages/supply-chain/order-management/order-types/auto-reserve';

let orderTypesPage!: OrderTypesPage;
let autoReservationPage!: autoReservationOrderTypePage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {
  orderTypesPage = new OrderTypesPage(page);
  autoReservationPage = new autoReservationOrderTypePage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({ }, testInfo) => {
  console.log(`Test finish: ${testInfo.title} - ${testInfo.status}`);
});

test('Create Order Type with Auto Reservation flow', async () => {

  await orderTypesPage.navigateToOrderTypes();

  await orderTypesPage.verifyNavigationToOrderTypes();

  const orderName = await autoReservationPage.createAutoReservationOrderType('Cairo Branch');

  await orderTypesPage.page.getByText(orderName).waitFor({ state: 'visible' });

});