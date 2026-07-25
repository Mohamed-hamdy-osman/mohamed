import { test } from '@playwright/test';
import { ManageInvoicesPage } from '../../../Pages/finance/account-payable/manage-Invoice';

let manageInvoicesPage: ManageInvoicesPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }) => {
  manageInvoicesPage = new ManageInvoicesPage(page);
  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');
});

test.describe('Manage Invoices', () => {

  test('Navigate to Manage Invoices', async () => {

    await manageInvoicesPage.navigateToManageInvoices();

    await manageInvoicesPage.verifyNavigationToManageInvoices();

  });

});