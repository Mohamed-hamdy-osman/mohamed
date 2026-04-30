import { expect, type Locator, type Page } from '@playwright/test';

export class ManageMiscTransactionsPage {

  readonly page: Page;

  readonly supplyChain_btn: Locator;
  readonly inventory_btn: Locator;
  readonly operationsmenu_btn: Locator;
  readonly miscTransactions_menu: Locator;
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

    // 🔥 الاسم حسب السيستم
    this.miscTransactions_menu = page.getByRole('link', {
      name: 'Miscellaneous Transactions',
      exact: true
    });

    this.create_btn = page.getByRole('button', { name: 'Create' });

    this.filterChevron = page.locator('span.pi-chevron-down');

    this.creationFrom_datepicker = page.locator('input[placeholder="Creation Date From"]');
    this.creationTo_datepicker = page.locator('input[placeholder="Creation Date To"]');

    this.search_btn = page.getByRole('button', { name: 'Search' });

    this.searchResultRow = page.locator('tbody tr').first();
  }

  async navigateToMiscTransactions() {

    await this.supplyChain_btn.click();

    await this.inventory_btn.click();

    await this.operationsmenu_btn.waitFor({ state: 'visible' });

    await this.operationsmenu_btn.click();

    await Promise.all([
      this.page.waitForURL(/miscellaneous-transactions/),
      this.miscTransactions_menu.click()
    ]);
  }

  async verifyNavigationToMiscTransactions() {

    await expect(this.page).toHaveURL(/miscellaneous-transactions/);

    await expect(this.create_btn).toBeVisible();
  }

  async creationDateFromAndCreationDateTo() {

    await this.filterChevron.click();

    await this.creationFrom_datepicker.waitFor({ state: 'visible' });

    await this.creationFrom_datepicker.fill('01/02/2025');

    await this.creationTo_datepicker.fill('28/02/2025');
  }

  async searchMiscTransactions() {

    await this.search_btn.waitFor({ state: 'visible' });

    await this.search_btn.click();
  }

  async verifySearchResult() {

    await this.searchResultRow.waitFor({ state: 'visible' });
  }
}