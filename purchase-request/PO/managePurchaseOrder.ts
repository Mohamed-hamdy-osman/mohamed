import { expect, type Locator, type Page } from '@playwright/test';

export class ManagePurchaseOrderPage {

  readonly page: Page;

  readonly supplyChain_btn: Locator;
  readonly purchasing_btn: Locator;
  readonly operationsmenu_btn: Locator;
  readonly purchaseOrder_menu: Locator;
  readonly create_btn: Locator;
  readonly filterChevron: Locator;
  readonly creationFrom_datepicker: Locator;
  readonly creationTo_datepicker: Locator;
  readonly search_btn: Locator;
  readonly searchResultRow: Locator;

  constructor(page: Page) {

    this.page = page;
    this.supplyChain_btn = page.getByText('Supply Chain');
    this.purchasing_btn = page.getByText('Purchasing');
    this.operationsmenu_btn = page.getByText('Operations');

    this.purchaseOrder_menu = page.getByRole('link', {
      name: 'Purchase Order',
      exact: true
    });

    this.create_btn = page.locator('button:has-text("Create")').nth(1);
    this.filterChevron = page.locator('span.pi-chevron-down');
    this.creationFrom_datepicker = page.locator('input[placeholder="Creation Date From"]');
    this.creationTo_datepicker = page.locator('input[placeholder="Creation Date To"]');
    this.search_btn = page.getByRole('button', { name: 'Search' });
    this.searchResultRow = page.locator('tbody tr').first();

  }

  async navigateToPurchaseOrders() {
    await this.supplyChain_btn.click();
    await this.purchasing_btn.click();
    await this.operationsmenu_btn.waitFor({ state: 'visible' });
    await this.operationsmenu_btn.click();

    await Promise.all([
      this.page.waitForURL(/purchase-order/),
      this.purchaseOrder_menu.click()
    ]);

  }

  async verifyNavigationToManagePurchaseOrders() {
    await expect(this.page).toHaveURL(/purchase-order/);
    await expect(this.create_btn).toBeVisible();
  }

  async creationDateFromAndCreationDateTo() {
    await this.filterChevron.click();
    await this.creationFrom_datepicker.fill('01/02/2025');
    await this.creationTo_datepicker.fill('28/02/2025');
  }

  async searchPurchaseOrder() {
    await this.search_btn.waitFor({ state: 'visible' });
    await this.search_btn.click();
  }

  async verifySearchResult() {
    await this.searchResultRow.waitFor({ state: 'visible' });
  }

}