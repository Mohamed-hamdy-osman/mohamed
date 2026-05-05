import { expect, type Locator, type Page } from '@playwright/test';

export class ManagePlannersPage {

  readonly page: Page;

  readonly supplyChain_btn: Locator;
  readonly inventory_btn: Locator;
  readonly settings_menu: Locator;
  readonly planners_menu: Locator;
  readonly create_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.supplyChain_btn = page.getByText('Supply Chain');
    this.inventory_btn = page.getByText('Inventory');
    this.settings_menu = page.getByText('Settings');

    this.planners_menu = page.getByRole('link', {
      name: 'Planners',
      exact: true
    });

    this.create_btn = page.getByRole('button', { name: 'Create' });
  }

  async navigateToPlanners() {

    await this.supplyChain_btn.click();
    await this.inventory_btn.click();

    await this.settings_menu.waitFor({ state: 'visible' });
    await this.settings_menu.click();

    await Promise.all([
      this.page.waitForURL(/planners/),
      this.planners_menu.click()
    ]);
  }

  async verifyNavigationToPlanners() {

    await expect(this.page).toHaveURL(/planners/);
    await expect(this.create_btn).toBeVisible();
  }
}