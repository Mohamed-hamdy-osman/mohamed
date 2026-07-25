import { expect, type Locator, type Page } from '@playwright/test';

export class ManageCustomerCategoryPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly financeMenu: Locator;
  readonly accountReceivableMenu: Locator;
  readonly settingsMenu: Locator;
  readonly customerCategoryOption: Locator;
  readonly manageCustomerCategoryHeader: Locator;
  readonly createBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).last();

    this.financeMenu = page.getByText('Finance');
    this.accountReceivableMenu = page.getByText('Account Receivable');
    this.settingsMenu = page.getByText('Settings');
    this.customerCategoryOption = page.getByText('Customer Category');

    this.manageCustomerCategoryHeader = page.locator('text=Customer Category').first();

    this.createBtn = page.getByRole('button', { name: 'Create' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({
      state: 'hidden'
    });
  }

  async navigateToManageCustomerCategory() {

    await this.waitForLoader();

    await this.logToCorporate_btn.click();
    await this.waitForLoader();

    await this.financeMenu.click();
    await this.waitForLoader();

    await this.accountReceivableMenu.click();
    await this.waitForLoader();

    await this.settingsMenu.waitFor({ state: 'visible' });
    await this.settingsMenu.click();

    await this.customerCategoryOption.waitFor({ state: 'visible' });

    await Promise.all([
      this.page.waitForURL(/customer-category/),
      this.customerCategoryOption.click()
    ]);

    await this.waitForLoader();

    await this.createBtn.waitFor({ state: 'visible' });
  }

  async verifyNavigationToManageCustomerCategory() {

    await this.waitForLoader();

    await expect(this.page).toHaveURL(/customer-category/);

    await expect(this.manageCustomerCategoryHeader).toBeVisible();

    await expect(this.createBtn).toBeVisible();
  }

}