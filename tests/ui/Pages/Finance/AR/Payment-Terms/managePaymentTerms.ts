import { expect, type Locator, type Page } from '@playwright/test';

export class ManagePaymentTermsPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly financeMenu: Locator;
  readonly accountReceivableMenu: Locator;
  readonly settingsMenu: Locator;
  readonly paymentTermsOption: Locator;
  readonly managePaymentTermsHeader: Locator;
  readonly createBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).last();

    this.financeMenu = page.getByText('Finance');
    this.accountReceivableMenu = page.getByText('Account Receivable');
    this.settingsMenu = page.getByText('Settings');
    this.paymentTermsOption = page.getByText('Payment Terms');

    this.managePaymentTermsHeader = page.locator('text=Payment Terms').first();

    this.createBtn = page.getByRole('button', { name: 'Create' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({
      state: 'hidden'
    });
  }

  async navigateToManagePaymentTerms() {

    await this.waitForLoader();

    await this.logToCorporate_btn.click();
    await this.waitForLoader();

    await this.financeMenu.click();
    await this.waitForLoader();

    await this.accountReceivableMenu.click();
    await this.waitForLoader();

    await this.settingsMenu.waitFor({ state: 'visible' });
    await this.settingsMenu.click();

    await this.paymentTermsOption.waitFor({ state: 'visible' });

    await Promise.all([
      this.page.waitForURL(/payment-terms/),
      this.paymentTermsOption.click()
    ]);

    await this.waitForLoader();

    await this.createBtn.waitFor({ state: 'visible' });
  }

  async verifyNavigationToManagePaymentTerms() {

    await this.waitForLoader();

    await expect(this.page).toHaveURL(/payment-terms/);

    await expect(this.managePaymentTermsHeader).toBeVisible();

    await expect(this.createBtn).toBeVisible();
  }

}
