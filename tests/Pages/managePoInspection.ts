import { expect, type Locator, type Page } from '@playwright/test';

export class ManagePOInspectionPage {

  readonly page: Page;

  readonly supplyChain_btn: Locator;
  readonly inventory_btn: Locator;
  readonly operationsmenu_btn: Locator;
  readonly PoInspection_menu: Locator;
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

    // 🔥 FIX: case-sensitive
    this.PoInspection_menu = page.getByRole('link', {
      name: 'Po Inspection',
      exact: true
    });

    this.create_btn = page.getByRole('button', { name: 'Create' });

    this.filterChevron = page.locator('span.pi-chevron-down');

    this.creationFrom_datepicker = page.locator('input[placeholder="Creation Date From"]');
    this.creationTo_datepicker = page.locator('input[placeholder="Creation Date To"]');

    this.search_btn = page.getByRole('button', { name: 'Search' });

    this.searchResultRow = page.locator('tbody tr').first();
  }

  async navigateToPOInspection() {

    await this.supplyChain_btn.click();

    await this.inventory_btn.click();

    await this.operationsmenu_btn.waitFor({ state: 'visible' });

    await this.operationsmenu_btn.click();

    // ✅ نفس pattern اللي كان شغال عندك في Receipt
    await Promise.all([
      this.page.waitForURL(/po-inspection/),
      this.PoInspection_menu.click()
    ]);
  }

  async verifyNavigationToPOInspection() {

    await expect(this.page).toHaveURL(/po-inspection/);

    await expect(this.create_btn).toBeVisible();
  }

  async creationDateFromAndCreationDateTo() {

    await this.filterChevron.click();

    await this.creationFrom_datepicker.waitFor({ state: 'visible' });

    await this.creationFrom_datepicker.fill('01/02/2025');

    await this.creationTo_datepicker.fill('28/02/2025');
  }

  async searchPOInspection() {

    await this.search_btn.waitFor({ state: 'visible' });

    await this.search_btn.click();
  }

  async verifySearchResult() {

    await this.searchResultRow.waitFor({ state: 'visible' });
  }
}