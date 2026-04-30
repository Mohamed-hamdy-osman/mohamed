import { expect, type Locator, type Page } from '@playwright/test';

export class ManagePendingMoveOrdersPage {

  readonly page: Page;

  readonly supplyChain_btn: Locator;
  readonly inventory_btn: Locator;
  readonly operationsmenu_btn: Locator;
  readonly pendingMoveOrders_menu: Locator;
  readonly create_btn: Locator;
  readonly filterChevron: Locator;
  readonly creationFrom_datepicker: Locator;
  readonly creationTo_datepicker: Locator;
  readonly search_btn: Locator;
  readonly searchResultRow: Locator;

  constructor(page: Page) {

    this.page = page;

    this.supplyChain_btn = page.getByText('Supply Chain');
    this.inventory_btn = page.getByText('Inventory');
    this.operationsmenu_btn = page.getByText('Operations');

    this.pendingMoveOrders_menu = page.getByRole('link', {
      name: 'Pending Move Orders',
      exact: true
    });

    this.create_btn = page.getByRole('button', { name: 'Create' });

    this.filterChevron = page.locator('span.pi-chevron-down');

    this.creationFrom_datepicker = page.locator('input[placeholder="Creation Date From"]');
    this.creationTo_datepicker = page.locator('input[placeholder="Creation Date To"]');

    this.search_btn = page.getByRole('button', { name: 'Search' });

    this.searchResultRow = page.locator('tbody tr').first();
  }

  async navigateToPendingMoveOrders() {

    await this.supplyChain_btn.click();
    await this.inventory_btn.click();
    await this.operationsmenu_btn.click();

    await Promise.all([
      this.page.waitForURL(/pending-move-orders/),
      this.pendingMoveOrders_menu.click()
    ]);
  }

  async verifyNavigationToPendingMoveOrders() {

    await expect(this.page).toHaveURL(/pending-move-orders/);
  }


}