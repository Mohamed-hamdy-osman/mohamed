import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ManagePendingMoveOrdersPage } from '../Pages/managePendingMoveOrders';

let loginPage!: LoginPage;
let pendingPage!: ManagePendingMoveOrdersPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);
  pendingPage = new ManagePendingMoveOrdersPage(page);

  await loginPage.goto();
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();
});

test('Verify Navigation Pending Move Orders', async () => {

  await pendingPage.navigateToPendingMoveOrders();
  await pendingPage.verifyNavigationToPendingMoveOrders();

});