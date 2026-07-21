import { expect, type Locator, type Page } from '@playwright/test';

export class ManageInvoicesPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly financeMenu: Locator;
  readonly accountPayableMenu: Locator;
  readonly operationsMenu: Locator;
  readonly invoicesOption: Locator;
  readonly manageInvoicesHeader: Locator;
  readonly addInvoiceBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).first();
    this.financeMenu = page.getByText('Finance');
    this.accountPayableMenu = page.getByText('Account Payable');
    this.operationsMenu = page.getByText('Operations');
    this.invoicesOption = page.getByText('Invoices');

    this.manageInvoicesHeader = page.locator('text=Invoices').first();
   this.addInvoiceBtn = page.getByRole('button', { name: 'Create' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  async navigateToManageInvoices() {
    await this.waitForLoader();

    await this.logToCorporate_btn.click();
    await this.waitForLoader();

    await this.financeMenu.click();
    await this.waitForLoader();

    await this.accountPayableMenu.click();
    await this.waitForLoader();

    await this.operationsMenu.waitFor({ state: 'visible' });
    await this.operationsMenu.click();

    await this.invoicesOption.waitFor({ state: 'visible' });

    await Promise.all([
      this.page.waitForURL(/invoice/),
      this.invoicesOption.click()
    ]);

    await this.waitForLoader();
    await this.addInvoiceBtn.waitFor({ state: 'visible' });
  }

  async verifyNavigationToManageInvoices() {
    await this.waitForLoader();

    await expect(this.page).toHaveURL((/invoice/));
    await expect(this.manageInvoicesHeader).toBeVisible();
    await expect(this.addInvoiceBtn).toBeVisible();
  }
}