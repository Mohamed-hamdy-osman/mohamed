import { expect, type Locator, type Page } from '@playwright/test';

export class ManageTransactOrdersPage {

  readonly page: Page;
  readonly logToCorporate_btn: Locator;
  readonly supplyChain_btn: Locator;
  readonly inventory_btn: Locator;
  readonly operationsmenu_btn: Locator;
  readonly transactOrders_menu: Locator;
  readonly create_btn: Locator;

  constructor(page: Page) {

    this.page = page;
    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).first();
    this.supplyChain_btn = page.getByText('Supply Chain');
    this.inventory_btn = page.getByText('Inventory');
    this.operationsmenu_btn = page.getByText('Operations');
    this.transactOrders_menu = page.getByRole('link', {
      name: 'Transact Orders',
      exact: true
    });

    this.create_btn = page.getByRole('button', { name: 'Create' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  async navigateToTransactOrders() {
    await this.waitForLoader();
    await this.logToCorporate_btn.click();
    await this.waitForLoader();
    await this.supplyChain_btn.click();
    await this.inventory_btn.click();
    await this.operationsmenu_btn.click();
    await Promise.all([
      this.page.waitForURL(/transact-move-orders/),
      this.transactOrders_menu.click()
    ]);
  }

  async verifyNavigationToTransactOrders() {

    await expect(this.page).toHaveURL(/transact-move-orders/);
  }
}