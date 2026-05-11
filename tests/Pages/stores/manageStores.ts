import { expect, type Locator, type Page } from '@playwright/test';

export class ManageStoresPage {

  readonly page: Page;

  readonly supplyChain_btn: Locator;
  readonly inventory_btn: Locator;
  readonly settings_menu: Locator;
  readonly stores_menu: Locator;
  readonly create_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.supplyChain_btn = page.getByText('Supply Chain');
    this.inventory_btn = page.getByText('Inventory');
    this.settings_menu = page.getByText('Settings');

    this.stores_menu = page.getByRole('link', {
      name: 'Stores',
      exact: true
    });

    this.create_btn = page.getByRole('button', { name: 'Create' });
  }

  async navigateToStores() {

    await this.supplyChain_btn.click();
    await this.inventory_btn.click();

    await this.settings_menu.waitFor({ state: 'visible' });
    await this.settings_menu.click();

    await Promise.all([
      this.page.waitForURL(/stores/),
      this.stores_menu.click()
    ]);
  }

  async verifyNavigationToStores() {

    await expect(this.page).toHaveURL(/stores/);
    await expect(this.create_btn).toBeVisible();
  }
}