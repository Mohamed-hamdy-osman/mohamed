import { test } from '@playwright/test';
import { ManageInvoicesPage } from '../../../../../Pages/finance/account-payable/manage-Invoice';
import { CreditInvoicePage } from '../../../../../Pages/finance/account-payable/credit-memo/without-po/credit-memo';


let manageInvoicesPage: ManageInvoicesPage;
let creditInvoicePage: CreditInvoicePage;

test.setTimeout(120000);

test.beforeEach(async ({ page }) => {
  manageInvoicesPage = new ManageInvoicesPage(page);
  creditInvoicePage = new CreditInvoicePage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');
});

test.describe('Credit Invoice', () => {

  test('Create Credit Invoice Without PO Successfully', async () => {

    // Navigate to Manage Invoices
    await manageInvoicesPage.navigateToManageInvoices();
    await manageInvoicesPage.verifyNavigationToManageInvoices();

    // Create Credit Invoice
    await creditInvoicePage.createCreditInvoice();

    // Add Invoice Line
    await creditInvoicePage.addInvoiceLine();

    // Submit Credit Invoice
    await creditInvoicePage.submitInvoice();

  });

});