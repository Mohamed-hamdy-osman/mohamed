import { expect, type Locator, type Page } from '@playwright/test';

export class ManagePurchaseRequestPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly supplyChain_btn: Locator;
  readonly purchasing_btn: Locator;
  readonly operationsmenu_btn: Locator;
  readonly purchaseRequests_menu: Locator;
  readonly create_btn: Locator;
  readonly filterChevron: Locator;
  readonly creationFrom_datepicker: Locator;
  readonly creationTo_datepicker: Locator;
  readonly search_btn: Locator;
  readonly searchResultRow: Locator;
  constructor(page: Page) {

    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).first();
    this.supplyChain_btn = page.getByText('Supply Chain');
    this.purchasing_btn = page.getByText('Purchasing');
    this.operationsmenu_btn = page.getByText('Operations');
    this.purchaseRequests_menu = page.getByRole('link', {
      name: 'Purchase Requests',
      exact: true
    });

    this.create_btn = page.getByRole('button', { name: 'Create' });
    this.filterChevron = page.locator('span.pi-chevron-down');
    this.creationFrom_datepicker = page.locator('input[placeholder="Creation Date From"]');
    this.creationTo_datepicker = page.locator('input[placeholder="Creation Date To"]');
    this.search_btn = page.getByRole('button', { name: 'Search' });
    this.searchResultRow = page.locator('tbody tr').first();
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  async navigateToPurchaseRequests() {
    await this.waitForLoader();
    await this.logToCorporate_btn.click();
    await this.waitForLoader();
    await this.supplyChain_btn.click();
    await this.purchasing_btn.click();
    await this.operationsmenu_btn.waitFor({ state: 'visible' });
    await this.operationsmenu_btn.click();
    await Promise.all([
      this.page.waitForURL(/purchase-requests/),
      this.purchaseRequests_menu.click()
    ]);

  }

  async verifyNavigationToManagePurchaseRequests() {
    await expect(this.page).toHaveURL(/purchase-requests/);
    await expect(this.create_btn).toBeVisible();
  }

  async creationDateFromAndCreationDateTo() {
    await this.filterChevron.click();
    await this.creationFrom_datepicker.waitFor({ state: 'visible' });
    await this.creationFrom_datepicker.fill('01/02/2025');
    await this.creationTo_datepicker.fill('28/02/2025');
  }

  async searchPurchaseRequest() {
    await this.search_btn.waitFor({ state: 'visible' });
    await this.search_btn.click();
  }

  async verifySearchResult() {
    await this.searchResultRow.waitFor({ state: 'visible' });
  }

}