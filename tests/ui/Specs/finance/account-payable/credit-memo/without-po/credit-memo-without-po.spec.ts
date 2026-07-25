import { test } from '@playwright/test';
import { ManageInvoicesPage } from '../../../../../Pages/Finance/AP/manageInvoice';
import { CreditInvoicePage } from '../../../../../Pages/Finance/AP/Credit-Memo/Without-PO/creditMemo';


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