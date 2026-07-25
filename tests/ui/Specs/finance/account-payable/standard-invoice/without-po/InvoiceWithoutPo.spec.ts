import { test } from '@playwright/test';
import { ManageInvoicesPage } from '../../../../../Pages/finance/AP/manageInvoice';
import { StandardInvoicePage } from '../../../../../Pages/finance/AP/Standard-Invoice/Without-PO/InvoiceWithoutPo';


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

  test('Create Standard Invoice Without PO Successfully', async () => {

    // Navigate to Manage Invoices
    await manageInvoicesPage.navigateToManageInvoices();
    await manageInvoicesPage.verifyNavigationToManageInvoices();

    // Create Standard Invoice
    await standardInvoicePage.createStandardInvoice();

    // Add Invoice Line
    await standardInvoicePage.addInvoiceLine();

    // Submit Invoice
    await standardInvoicePage.submitInvoice();

  });


});