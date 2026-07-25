import { expect, type Locator, type Page } from '@playwright/test';

export class ManageSalesPersonPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly financeMenu: Locator;
  readonly accountReceivableMenu: Locator;
  readonly settingsMenu: Locator;
  readonly salesPersonOption: Locator;
  readonly manageSalesPersonHeader: Locator;
  readonly createBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).last();

    this.financeMenu = page.getByText('Finance');
    this.accountReceivableMenu = page.getByText('Account Receivable');
    this.settingsMenu = page.getByText('Settings');
    this.salesPersonOption = page.getByText('Sales Person');

    this.manageSalesPersonHeader = page.locator('text=Sales Person').first();

    this.createBtn = page.getByRole('button', { name: 'Create' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({
      state: 'hidden'
    });
  }

  async navigateToManageSalesPerson() {

    await this.waitForLoader();

    await this.logToCorporate_btn.click();
    await this.waitForLoader();

    await this.financeMenu.click();
    await this.waitForLoader();

    await this.accountReceivableMenu.click();
    await this.waitForLoader();

    await this.settingsMenu.waitFor({ state: 'visible' });
    await this.settingsMenu.click();

    await this.salesPersonOption.waitFor({ state: 'visible' });

    await Promise.all([
      this.page.waitForURL(/sales-person/),
      this.salesPersonOption.click()
    ]);

    await this.waitForLoader();

    await this.createBtn.waitFor({ state: 'visible' });
  }

  async verifyNavigationToManageSalesPerson() {

    await this.waitForLoader();

    await expect(this.page).toHaveURL(/sales-person/);

    await expect(this.manageSalesPersonHeader).toBeVisible();

    await expect(this.createBtn).toBeVisible();
  }

}