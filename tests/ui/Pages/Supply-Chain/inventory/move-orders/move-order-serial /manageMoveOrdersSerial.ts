import { expect, type Locator, type Page } from '@playwright/test';

export class ManageMoveOrdersSerialPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly supplyChain_btn: Locator;
  readonly inventory_btn: Locator;
  readonly settings_menu: Locator;
  readonly moveOrdersSerial_menu: Locator;
  readonly create_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).first();
    this.supplyChain_btn = page.getByText('Supply Chain');
    this.inventory_btn = page.getByText('Inventory');
    this.settings_menu = page.getByText('Settings');

    this.moveOrdersSerial_menu = page.getByRole('link', {
      name: 'Move Orders Serial',
      exact: true
    });

    this.create_btn = page.getByRole('button', { name: 'Create' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  async navigateToMoveOrdersSerial() {
    await this.waitForLoader();
    await this.logToCorporate_btn.click();
    await this.waitForLoader();
    await this.supplyChain_btn.click();
    await this.inventory_btn.click();

    await this.settings_menu.waitFor({ state: 'visible' });
    await this.settings_menu.click();

    await Promise.all([
      this.page.waitForURL(/move-orders-serial/),
      this.moveOrdersSerial_menu.click()
    ]);
  }

  async verifyNavigationToMoveOrdersSerial() {

    await expect(this.page).toHaveURL(/move-orders-serial/);
  }
}