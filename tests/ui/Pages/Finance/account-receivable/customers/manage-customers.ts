import { expect, type Locator, type Page } from '@playwright/test';

export class ManageCustomersPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly financeMenu: Locator;
  readonly accountReceivableMenu: Locator;
  readonly settingsMenu: Locator;
  readonly customersOption: Locator;
  readonly manageCustomersHeader: Locator;
  readonly createBtn: Locator;


  constructor(page: Page) {
    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).last();

    this.financeMenu = page.getByText('Finance');
    this.accountReceivableMenu = page.getByText('Account Receivable');
    this.settingsMenu = page.getByText('Settings');
    this.customersOption = page.getByRole('link', { name: 'Customers', exact: true });

    this.manageCustomersHeader = page.locator('text=Customers').first();

    this.createBtn = page.getByRole('button', { name: 'Create' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({
      state: 'hidden'
    });
  }

  async navigateToManageCustomers() {

    await this.waitForLoader();

    await this.logToCorporate_btn.click();
    await this.waitForLoader();

    await this.financeMenu.click();
    await this.waitForLoader();

    await this.accountReceivableMenu.click();
    await this.waitForLoader();

    await this.settingsMenu.waitFor({ state: 'visible' });
    await this.settingsMenu.click();

    await this.customersOption.waitFor({ state: 'visible' });

    await Promise.all([
      this.page.waitForURL(/customers/),
      this.customersOption.click()
    ]);

    await this.waitForLoader();

    await this.createBtn.waitFor({ state: 'visible' });
  }

  async verifyNavigationToManageCustomers() {

    await this.waitForLoader();

    await expect(this.page).toHaveURL(/customers/);

    await expect(this.manageCustomersHeader).toBeVisible();

    await expect(this.createBtn).toBeVisible();
  }

}