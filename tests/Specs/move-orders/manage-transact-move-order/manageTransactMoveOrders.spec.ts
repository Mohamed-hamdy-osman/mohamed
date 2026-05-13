import { test } from '@playwright/test';
import { LoginPage } from '../../../Pages/login/loginPage';
import { ManageTransactOrdersPage } from '../../../Pages/move-orders/manage-transact-move-order/manageTransactMoveOrders';

let loginPage!: LoginPage;
let transactPage!: ManageTransactOrdersPage;

test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);
  transactPage = new ManageTransactOrdersPage(page);

  await loginPage.goto();
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();

});

test('Verify Navigation Transact Orders', async () => {

  await transactPage.navigateToTransactOrders();
  await transactPage.verifyNavigationToTransactOrders();

});