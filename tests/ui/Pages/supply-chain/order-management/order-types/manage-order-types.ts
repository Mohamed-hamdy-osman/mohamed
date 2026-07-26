import { expect, type Locator, type Page } from '@playwright/test';

export class OrderTypesPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly supplyChain_btn: Locator;
  readonly orderManagement_btn: Locator;
  readonly settingsmenu_btn: Locator;
  readonly orderTypes_menu: Locator;
  readonly add_btn: Locator;
  readonly filterChevron: Locator;
  readonly creationFrom_datepicker: Locator;
  readonly creationTo_datepicker: Locator;
  readonly search_btn: Locator;
  readonly searchResultRow: Locator;

  constructor(page: Page) {

    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).last();
    this.supplyChain_btn = page.getByText('Supply Chain');
    this.orderManagement_btn = page.getByText('Order Management');

    this.settingsmenu_btn = page.getByText('Settings');

    this.orderTypes_menu = page.getByRole('link', {
      name: 'Order Types',
      exact: true
    });

    this.add_btn = page.getByRole('button', { name: 'Add' });

    this.filterChevron = page.locator('span.pi-chevron-down');
    this.creationFrom_datepicker = page.locator('input[placeholder="Creation Date From"]');
    this.creationTo_datepicker = page.locator('input[placeholder="Creation Date To"]');
    this.search_btn = page.getByRole('button', { name: 'Search' });
    this.searchResultRow = page.locator('tbody tr').first();
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  async navigateToOrderTypes() {

    await this.waitForLoader();

    await this.logToCorporate_btn.click();
    await this.waitForLoader();

    await this.supplyChain_btn.click();
    await this.orderManagement_btn.click();

    await this.settingsmenu_btn.waitFor({ state: 'visible' });
    await this.settingsmenu_btn.click();

    await Promise.all([
      this.page.waitForURL(/order-types/),
      this.orderTypes_menu.click()
    ]);

  }

  async verifyNavigationToOrderTypes() {

    await expect(this.page).toHaveURL(/order-types/);
    await expect(this.add_btn).toBeVisible();

  }

  async creationDateFromAndCreationDateTo() {

    await this.filterChevron.click();

    await this.creationFrom_datepicker.waitFor({ state: 'visible' });
    await this.creationFrom_datepicker.fill('01/02/2025');

    await this.creationTo_datepicker.fill('28/02/2025');

  }

  async searchOrderTypes() {

    await this.search_btn.waitFor({ state: 'visible' });
    await this.search_btn.click();

  }

  async verifySearchResult() {

    await this.searchResultRow.waitFor({ state: 'visible' });

  }

}