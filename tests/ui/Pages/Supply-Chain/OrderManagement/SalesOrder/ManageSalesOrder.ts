import { expect, type Locator, type Page } from '@playwright/test';

export class SalesOrdersPage {

  readonly page: Page;

  readonly supplyChain_btn: Locator;
  readonly orderManagement_btn: Locator;
  readonly operationsmenu_btn: Locator;
  readonly salesOrders_menu: Locator;
  readonly create_btn: Locator;
  readonly filterChevron: Locator;
  readonly creationFrom_datepicker: Locator;
  readonly creationTo_datepicker: Locator;
  readonly search_btn: Locator;
  readonly searchResultRow: Locator;

  constructor(page: Page) {

    this.page = page;

    this.supplyChain_btn = page.getByText('Supply Chain');
    this.orderManagement_btn = page.getByText('Order Management');
    this.operationsmenu_btn = page.getByText('Operations');
    this.salesOrders_menu = page.getByRole('link', {
      name: 'Sales Orders',
      exact: true
    });

    this.create_btn = page.getByRole('button', { name: 'Create' });
    this.filterChevron = page.locator('span.pi-chevron-down');
    this.creationFrom_datepicker = page.locator('input[placeholder="Creation Date From"]');
    this.creationTo_datepicker = page.locator('input[placeholder="Creation Date To"]');
    this.search_btn = page.getByRole('button', { name: 'Search' });
    this.searchResultRow = page.locator('tbody tr').first();
  }

  async navigateToSalesOrders() {

    await this.supplyChain_btn.click();
    await this.orderManagement_btn.click();

    await this.operationsmenu_btn.waitFor({ state: 'visible' });
    await this.operationsmenu_btn.click();

    await Promise.all([
      this.page.waitForURL(/sales-orders/),
      this.salesOrders_menu.click()
    ]);

  }

  async verifyNavigationToSalesOrders() {

    await expect(this.page).toHaveURL(/sales-orders/);
    await expect(this.create_btn).toBeVisible();

  }

  async creationDateFromAndCreationDateTo() {

    await this.filterChevron.click();

    await this.creationFrom_datepicker.waitFor({ state: 'visible' });
    await this.creationFrom_datepicker.fill('01/02/2025');

    await this.creationTo_datepicker.fill('28/02/2025');

  }

  async searchSalesOrders() {

    await this.search_btn.waitFor({ state: 'visible' });
    await this.search_btn.click();

  }

  async verifySearchResult() {

    await this.searchResultRow.waitFor({ state: 'visible' });

  }

}