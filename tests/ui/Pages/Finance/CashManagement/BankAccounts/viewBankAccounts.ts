import { expect, type Locator, type Page } from '@playwright/test';

export class ViewBankAccountPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly financeMenu: Locator;
  readonly cashManagementMenu: Locator;
  readonly settingsMenu: Locator;
  readonly bankAccountsOption: Locator;
  readonly manageBankAccountsHeader: Locator;
  readonly viewBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).last();

    this.financeMenu = page.getByText('Finance');
    this.cashManagementMenu = page.getByText('Cash Management');
    this.settingsMenu = page.getByText('Settings');
    this.bankAccountsOption = page.getByText('Bank Accounts');

    this.manageBankAccountsHeader = page.locator('text=Bank Accounts').first();

    // أول زر View في الجدول
    this.viewBtn = page.locator('i.ki-eye').first();
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({
      state: 'hidden'
    });
  }

  async navigateToViewBankAccount() {

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

    await this.viewBtn.waitFor({ state: 'visible' });

    await this.viewBtn.click();

    await this.waitForLoader();
  }

  async verifyViewBankAccount() {

    await this.waitForLoader();

    await expect(this.page).toHaveURL(/cash-management\/bank-accounts/);

    await expect(this.manageBankAccountsHeader).toBeVisible();
  }

}