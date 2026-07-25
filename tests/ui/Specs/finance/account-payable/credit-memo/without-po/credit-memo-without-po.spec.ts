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

    await manageInvoicesPage.navigateToManageInvoices();
    await manageInvoicesPage.verifyNavigationToManageInvoices();

    await creditInvoicePage.createCreditInvoice();

    await creditInvoicePage.addInvoiceLine();

    await creditInvoicePage.submitInvoice();

  });

});