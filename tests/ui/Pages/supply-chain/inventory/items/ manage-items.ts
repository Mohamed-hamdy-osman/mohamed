import { expect, type Locator, type Page } from '@playwright/test';

export class ManageItemsPage {

  readonly page: Page;

  readonly supplyChain_btn: Locator;
  readonly inventory_btn: Locator;
  readonly settings_menu: Locator;
  readonly items_menu: Locator;
  readonly create_btn: Locator;

  readonly logToCorporate_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).last();
    this.supplyChain_btn = page.getByText('Supply Chain');
    this.inventory_btn = page.getByText('Inventory');
    this.settings_menu = page.getByText('Settings');

    this.items_menu = page.getByRole('link', {
      name: 'Items',
      exact: true
    });

    this.create_btn = page.getByRole('button', { name: 'Create' });
  }

  async navigateToItems() {

    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 20000 });
    await this.logToCorporate_btn.click();
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 20000 });

    await this.supplyChain_btn.click();
    await this.inventory_btn.click();

    await this.settings_menu.waitFor({ state: 'visible' });
    await this.settings_menu.click();

    await Promise.all([
      this.page.waitForURL(/items/),
      this.items_menu.click()
    ]);
  }

  async verifyNavigationToItems() {

    await expect(this.page).toHaveURL(/items/);
    await expect(this.create_btn).toBeVisible();
  }
}