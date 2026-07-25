import { test } from '@playwright/test';
import { ManageInvoicesPage } from '../../../../Pages/finance/AP/manageInvoice';
import { DebitMemoPage } from '../../../../Pages/finance/AP/Debit-Memo/debitMemo';

let manageInvoicesPage: ManageInvoicesPage;
let debitMemoPage: DebitMemoPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }) => {
  manageInvoicesPage = new ManageInvoicesPage(page);
  debitMemoPage = new DebitMemoPage(page);
   await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');
});

test.describe('Debit Memo', () => {

  test('Create Debit Memo Invoice', async () => {

    // Navigate to Invoices
    await manageInvoicesPage.navigateToManageInvoices();

    // Verify Navigation
    await manageInvoicesPage.verifyNavigationToManageInvoices();

    // Create Debit Memo
    await debitMemoPage.createDebitMemoInvoice();

    // Add Invoice Line
    await debitMemoPage.addInvoiceLine();

    // Submit Invoice
    await debitMemoPage.submitInvoice();


  });

});