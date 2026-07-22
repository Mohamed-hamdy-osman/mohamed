import { expect, type Locator, type Page } from '@playwright/test';

export class ManageBanksPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly financeMenu: Locator;
  readonly cashManagementMenu: Locator;
  readonly settingsMenu: Locator;
  readonly banksOption: Locator;
  readonly manageBanksHeader: Locator;
  readonly createBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).last();

    this.financeMenu = page.getByText('Finance');
    this.cashManagementMenu = page.getByText('Cash Management');
    this.settingsMenu = page.getByText('Settings');
    this.banksOption = page.getByText('Banks');

    this.manageBanksHeader = page.locator('text=Banks').first();

    this.createBtn = page.getByRole('button', { name: 'Create' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({
      state: 'hidden'
    });
  }

  async navigateToManageBanks() {

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

    await this.createBtn.waitFor({ state: 'visible' });
  }

  async verifyNavigationToManageBanks() {

    await this.waitForLoader();

    await expect(this.page).toHaveURL(/cash-management\/bank/);

    await expect(this.manageBanksHeader).toBeVisible();

    await expect(this.createBtn).toBeVisible();
  }

}