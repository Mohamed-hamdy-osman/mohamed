import { expect, type Locator, type Page, test } from '@playwright/test';

export class ManageDepartmentsPage {

  readonly page: Page;
  readonly humanResources_btn: Locator;
  readonly personal_btn: Locator;
  readonly settings_btn: Locator;
  readonly departments_menu: Locator;
  readonly create_btn: Locator;
  readonly filterChevron: Locator;
  readonly search_btn: Locator;
  readonly clear_btn: Locator;
  readonly name_input: Locator;
  readonly status_dropdown: Locator;
  readonly searchResultRow: Locator;
  readonly edit_btn: Locator;


  constructor(page: Page) {
    this.page = page;
    // Menu Selectors
    this.humanResources_btn = page.getByText('Human Resources');
    this.personal_btn = page.getByText('Personal management');
    this.settings_btn = page.getByText('Settings');
    this.departments_menu = page.getByRole('link', { name: 'Departments' });

    // Action Selectors
    this.create_btn = page.getByRole('button', { name: 'Create' });
    this.filterChevron = page.locator('span.pi-chevron-down').first();
    this.search_btn = page.getByRole('button', { name: 'Search' });
    this.clear_btn = page.getByRole('button', { name: 'Clear' });
    this.name_input = page.getByRole('textbox', { name: 'Search In Departments Name' });
    this.status_dropdown = page.getByRole('combobox', { name: 'Status' });
    this.searchResultRow = page.locator('tbody tr').first();
    this.edit_btn = page.locator('button.p-button-secondary').filter({ has: page.locator('i.pi-pencil') });
  }

  async navigateToDepartments() {
    await test.step('Navigating to Manage Departments Page', async () => {
      await this.humanResources_btn.first().click();
      await this.personal_btn.first().click();
      await this.settings_btn.first().waitFor({ state: 'visible' });
      await this.settings_btn.first().click();

      await Promise.all([
        this.page.waitForURL(/departments/, { waitUntil: 'domcontentloaded' }),
        this.departments_menu.click()
      ]);
      await this.page.waitForLoadState('networkidle');
    });
  }

  async verifyNavigationToManageDepartments() {
    await test.step('Verify Navigation to Departments', async () => {
      await expect(this.page).toHaveURL(/departments/);
      await expect(this.create_btn).toBeVisible({ timeout: 15000 });
    });
  }

  async searchDepartment(name?: string, status?: string) {
    await test.step(`Searching for department: ${name || 'All'} with status: ${status || 'All'}`, async () => {
      // Ensure the search panel is expanded
      if (!await this.search_btn.isVisible()) {
        await this.filterChevron.click();
        await this.search_btn.waitFor({ state: 'visible' });
      }

      if (name) {
        await this.name_input.fill(name);
      }

      if (status) {
        await this.status_dropdown.click();
        // Wait for the dropdown overlay and click the specific item
        const option = this.page.getByRole('option', { name: status });
        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.click();
      }
      
      await this.search_btn.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async clearFilters() {
    await test.step('Clearing Search Filters', async () => {
      await this.clear_btn.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async verifySearchResult() {
    await test.step('Verify Search Results', async () => {
      // Extended timeout for slow searches
      await expect(this.searchResultRow).toBeVisible({ timeout: 20000 });
      const rowCount = await this.page.locator('tbody tr').count();
      expect(rowCount).toBeGreaterThan(0);
    });
  }
}