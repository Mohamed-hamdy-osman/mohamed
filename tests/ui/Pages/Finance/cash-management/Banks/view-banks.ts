import { expect, type Locator, type Page } from '@playwright/test';

export class ViewBankPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly financeMenu: Locator;
  readonly cashManagementMenu: Locator;
  readonly settingsMenu: Locator;
  readonly banksOption: Locator;
  readonly manageBanksHeader: Locator;
 readonly viewBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).last();

    this.financeMenu = page.getByText('Finance');
    this.cashManagementMenu = page.getByText('Cash Management');
    this.settingsMenu = page.getByText('Settings');
    this.banksOption = page.getByText('Banks');

    this.manageBanksHeader = page.locator('text=Banks').first();

    // First View button
    this.viewBtn = page.locator('i.ki-eye').first();
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({
      state: 'hidden'
    });
  }

  async navigateToViewBank() {

    await this.waitForLoader();

    await this.logToCorporate_btn.click();
    await this.waitForLoader();

    await this.financeMenu.click();
    await this.waitForLoader();

    await this.cashManagementMenu.click();
    await this.waitForLoader();

    await this.settingsMenu.waitFor({ state: 'visible' });
    await this.settingsMenu.click();

    await this.banksOption.waitFor({ state: 'visible' });

    await Promise.all([
      this.page.waitForURL(/cash-management\/bank/),
      this.banksOption.click()
    ]);

    await this.waitForLoader();

    await this.viewBtn.waitFor({ state: 'visible' });
    await this.viewBtn.click();

    await this.waitForLoader();
  }

  async verifyViewBank() {

    await this.waitForLoader();

    await expect(this.page).toHaveURL(/cash-management\/bank/);

    await expect(this.manageBanksHeader).toBeVisible();
  }

}