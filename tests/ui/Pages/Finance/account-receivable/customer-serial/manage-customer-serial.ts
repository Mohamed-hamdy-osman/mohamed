import { expect, type Locator, type Page } from '@playwright/test';

export class ManageCustomerSerialPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly financeMenu: Locator;
  readonly accountReceivableMenu: Locator;
  readonly settingsMenu: Locator;
  readonly customerSerialOption: Locator;
  readonly manageCustomerSerialHeader: Locator;
  readonly createBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).last();

    this.financeMenu = page.getByText('Finance');
    this.accountReceivableMenu = page.getByText('Account Receivable');
    this.settingsMenu = page.getByText('Settings');
    this.customerSerialOption = page.getByText('Customer Serial');

    this.manageCustomerSerialHeader = page.locator('text=Customer Serial').first();

    this.createBtn = page.getByRole('button', { name: 'Create' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({
      state: 'hidden'
    });
  }

  async navigateToManageCustomerSerial() {

    await this.waitForLoader();

    await this.logToCorporate_btn.click();
    await this.waitForLoader();

    await this.financeMenu.click();
    await this.waitForLoader();

    await this.accountReceivableMenu.click();
    await this.waitForLoader();

    await this.settingsMenu.waitFor({ state: 'visible' });
    await this.settingsMenu.click();

    await this.customerSerialOption.waitFor({ state: 'visible' });

    await Promise.all([
      this.page.waitForURL(/customer-serial/),
      this.customerSerialOption.click()
    ]);

    await this.waitForLoader();
  }

  async verifyNavigationToManageCustomerSerial() {

    await this.waitForLoader();

    await expect(this.page).toHaveURL(/customer-serial/);

    await expect(this.manageCustomerSerialHeader).toBeVisible();
  }

}