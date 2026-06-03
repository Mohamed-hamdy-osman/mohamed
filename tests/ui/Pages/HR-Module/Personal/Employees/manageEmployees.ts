import { expect, type Locator, type Page, test } from '@playwright/test';

export class ManageEmployeesPage {

  readonly page: Page;
  readonly humanResources_btn: Locator;
  readonly personal_btn: Locator;
  readonly settings_btn: Locator;
  readonly employees_menu: Locator;
  readonly create_btn: Locator;
  readonly filterChevron: Locator;
  readonly search_btn: Locator;
  readonly clear_btn: Locator;
  readonly name_input: Locator;
  readonly searchResultRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.humanResources_btn = page.getByText('Human Resources');
    this.personal_btn = page.locator('div[role="dialog"], .p-dialog').getByText('Personal management');
    this.settings_btn = page.getByText('Settings');
    this.employees_menu = page.getByRole('link', { name: 'Employees' });

    this.create_btn = page.getByRole('button', { name: 'Create' });
    this.filterChevron = page.getByRole('button', { name: /Filter/i });
    this.search_btn = page.getByRole('button', { name: 'Search' });
    this.clear_btn = page.getByRole('button', { name: 'Clear' });
    this.name_input = page.getByPlaceholder('Search In Employees Name');
    this.searchResultRow = page.locator('tbody tr').first();
  }

  async navigateToEmployees() {
    await test.step('Navigating to Manage Employees Page', async () => {
      await this.humanResources_btn.first().click();
      await this.personal_btn.first().click();
      await this.settings_btn.first().waitFor({ state: 'visible' });
      await this.settings_btn.first().click();

      await Promise.all([
        this.page.waitForURL(/employees/, { waitUntil: 'domcontentloaded' }),
        this.employees_menu.click()
      ]);
      await this.create_btn.waitFor({ state: 'visible', timeout: 30000 });
    });
  }

  async verifyNavigationToManageEmployees() {
    await test.step('Verify Navigation to Employees', async () => {
      await expect(this.page).toHaveURL(/employees/);
      await expect(this.create_btn).toBeVisible({ timeout: 15000 });
    });
  }

  async getFirstEmployeeName(): Promise<string | null> {
    await this.page.waitForTimeout(2000); // Wait for table data to settle
    const isVisible = await this.searchResultRow.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (isVisible) {
      const rowText = await this.searchResultRow.innerText();
      if (!rowText.includes('No Available Data')) {
         // The employee name is in the first column (index 0) of the row.
         const nameCell = this.searchResultRow.locator('td').nth(0);
         const fullName = (await nameCell.innerText()).trim();
         const firstWord = fullName.split(/\s+/)[0];
         return firstWord || null;
      }
    }
    return null;
  }

  async searchEmployeeByName(name: string) {
    await test.step(`Searching for employee name: ${name}`, async () => {
      if (!await this.search_btn.isVisible()) {
        await this.filterChevron.click({ timeout: 5000 });
        await this.search_btn.waitFor({ state: 'visible', timeout: 5000 });
      }

      await this.name_input.fill(name);
      await this.search_btn.click({ timeout: 5000 });
      await this.page.waitForTimeout(1000);
    });
  }

  async searchByDropdown(dropdownNameOrIndex: string | RegExp | number, itemIndex: number = 0) {
    await test.step(`Searching by dropdown: ${dropdownNameOrIndex}`, async () => {
      if (!await this.search_btn.isVisible()) {
        await this.filterChevron.click({ timeout: 5000 });
        await this.search_btn.waitFor({ state: 'visible', timeout: 5000 });
      }

      let dropdown;
      if (typeof dropdownNameOrIndex === 'number') {
        dropdown = this.page.locator('.select').nth(dropdownNameOrIndex).locator('[role="combobox"], .p-select, .p-dropdown').first();
      } else {
        dropdown = this.page.getByRole('combobox', { name: dropdownNameOrIndex }).first();
      }
      
      await dropdown.click({ timeout: 5000 });
      await this.page.waitForTimeout(500);

      const panel = this.page.locator('.p-select-overlay:visible, .p-dropdown-panel:visible, .p-overlay:visible').first();
      await panel.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      
      const items = panel.locator('li.p-select-option, li.p-dropdown-item, [role="option"]');
      // Wait for the first option to load and become visible
      await items.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      
      if (await items.count() > itemIndex) {
        const itemText = await items.nth(itemIndex).innerText();
        console.log(`Selecting dropdown option: "${itemText}" at index ${itemIndex}`);
        await items.nth(itemIndex).click({ timeout: 5000 });
      } else {
        console.log(`Dropdown option at index ${itemIndex} not found. Pressing Escape.`);
        await this.page.keyboard.press('Escape'); // fallback if empty
      }
      
      await this.page.waitForTimeout(500);
      // Press Escape to ensure any open overlay panel is closed
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
      
      await this.search_btn.click({ timeout: 5000, force: true });
      await this.page.waitForTimeout(1000);
    });
  }

  async verifySearchResult() {
    await test.step('Verify Search Results', async () => {
      await this.page.waitForTimeout(1000); 
      const isVisible = await this.searchResultRow.isVisible({ timeout: 10000 });
      if (!isVisible) {
          const noData = this.page.getByText(/No Available Data|No Data/i);
          await expect(noData).toBeVisible();
      } else {
          const rowCount = await this.page.locator('tbody tr').count();
          expect(rowCount).toBeGreaterThan(0);
      }
    });
  }

  async clearFilters() {
    await test.step('Clearing Search Filters', async () => {
      if (!await this.clear_btn.isVisible()) {
        await this.filterChevron.click({ timeout: 5000 });
        await this.clear_btn.waitFor({ state: 'visible', timeout: 5000 });
      }
      await this.clear_btn.click({ timeout: 5000, force: true });
      await this.page.waitForTimeout(1000);
    });
  }
}
