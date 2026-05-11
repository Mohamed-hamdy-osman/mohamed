import { test } from '@playwright/test';
import { LoginPage } from '../../../Pages/login/loginPage';
import { ManageMoveOrdersPage } from '../../../Pages/move-orders/manage-move-order/manageMoveOrders';
let loginPage!: LoginPage;
let moveOrdersPage!: ManageMoveOrdersPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  moveOrdersPage = new ManageMoveOrdersPage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Move Orders Page', async () => {

  await moveOrdersPage.navigateToMoveOrders();
  await moveOrdersPage.verifyNavigationToMoveOrders();

});

