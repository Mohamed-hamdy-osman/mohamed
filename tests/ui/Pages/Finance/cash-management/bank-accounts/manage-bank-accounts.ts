import { expect, type Locator, type Page } from '@playwright/test';

export class ManageBankAccountsPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly financeMenu: Locator;
  readonly cashManagementMenu: Locator;
  readonly settingsMenu: Locator;
  readonly bankAccountsOption: Locator;
  readonly manageBankAccountsHeader: Locator;
  readonly createBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).last();

    this.financeMenu = page.getByText('Finance');
    this.cashManagementMenu = page.getByText('Cash Management');
    this.settingsMenu = page.getByText('Settings');
    this.bankAccountsOption = page.getByText('Bank Accounts');

    this.manageBankAccountsHeader = page.locator('text=Bank Accounts').first();

    this.createBtn = page.getByRole('button', { name: 'Create' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({
      state: 'hidden'
    });
  }

  async navigateToManageBankAccounts() {

    await this.waitForLoader();

    await this.logToCorporate_btn.click();
    await this.waitForLoader();

    await this.financeMenu.click();
    await this.waitForLoader();

    await this.cashManagementMenu.click();
    await this.waitForLoader();

    await this.settingsMenu.waitFor({ state: 'visible' });
    await this.settingsMenu.click();

    await this.bankAccountsOption.waitFor({ state: 'visible' });

    await Promise.all([
      this.page.waitForURL(/cash-management\/bank-accounts/),
      this.bankAccountsOption.click()
    ]);

    await this.waitForLoader();

    await this.createBtn.waitFor({ state: 'visible' });
  }

  async verifyNavigationToManageBankAccounts() {

    await this.waitForLoader();

    await expect(this.page).toHaveURL(/cash-management\/bank-accounts/);

    await expect(this.manageBankAccountsHeader).toBeVisible();

    await expect(this.createBtn).toBeVisible();
  }

}