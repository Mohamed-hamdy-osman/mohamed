import { test } from '@playwright/test';
import { ManageInvoicesPage } from '../../../../../Pages/finance/account-payable/manage-Invoice';
import { StandardInvoicePage } from '../../../../../Pages/finance/account-payable/standard-invoice/with-po/invoice-with-po';

let manageInvoicesPage: ManageInvoicesPage;
let standardInvoicePage: StandardInvoicePage;

test.setTimeout(120000);

test.beforeEach(async ({ page }) => {
  manageInvoicesPage = new ManageInvoicesPage(page);
  standardInvoicePage = new StandardInvoicePage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');
});

test.describe('Standard Invoice', () => {

  test('Create Standard Invoice Successfully', async () => {

    await manageInvoicesPage.navigateToManageInvoices();
    await manageInvoicesPage.verifyManageInvoicesPageLoaded();
    await standardInvoicePage.createStandardInvoice();

  });

});