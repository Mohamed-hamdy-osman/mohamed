import { expect, type Locator, type Page, test } from '@playwright/test';

export class ManageGradesPage {

  readonly page: Page;
  readonly humanResources_btn: Locator;
  readonly personal_btn: Locator;
  readonly settings_btn: Locator;
  readonly grades_menu: Locator;
  readonly create_btn: Locator;
  readonly filterChevron: Locator;
  readonly search_btn: Locator;
  readonly clear_btn: Locator;
  readonly name_input: Locator;
  readonly searchResultRow: Locator;
  readonly edit_btn: Locator;

  constructor(page: Page) {
    this.page = page;
    // Menu Selectors
    this.humanResources_btn = page.getByText('Human Resources');
    this.personal_btn = page.getByText('Personal management');
    this.settings_btn = page.getByText('Settings');
    this.grades_menu = page.getByRole('link', { name: 'Grades' });

    // Action Selectors
    this.create_btn = page.getByRole('button', { name: 'Create' });
    this.filterChevron = page.locator('span.pi-chevron-down').first();
    this.search_btn = page.getByRole('button', { name: 'Search' });
    this.clear_btn = page.getByRole('button', { name: 'Clear' });
    this.name_input = page.getByRole('textbox', { name: /Search In Grades Title|Title/i });
    this.searchResultRow = page.locator('tbody tr').first();
    this.edit_btn = page.locator('button.p-button-secondary').filter({ has: page.locator('i.ki-notepad-edit') });
  }

  async navigateToGrades() {
    await test.step('Navigating to Manage Grades Page', async () => {
      await this.humanResources_btn.first().click();
      await this.personal_btn.first().click();
      await this.settings_btn.first().waitFor({ state: 'visible' });
      await this.settings_btn.first().click();

      await Promise.all([
        this.page.waitForURL(/grades/, { waitUntil: 'domcontentloaded' }),
        this.grades_menu.click()
      ]);
      await this.page.waitForLoadState('networkidle');
    });
  }

  async verifyNavigationToManageGrades() {
    await test.step('Verify Navigation to Grades', async () => {
      await expect(this.page).toHaveURL(/grades/);
      await expect(this.create_btn).toBeVisible({ timeout: 15000 });
    });
  }

  async searchGrade(title?: string) {
    await test.step(`Searching for grade: ${title || 'All'}`, async () => {
      // Ensure the search panel is expanded
      if (!await this.search_btn.isVisible()) {
        await this.filterChevron.click();
        await this.search_btn.waitFor({ state: 'visible' });
      }

      if (title) {
        await this.name_input.fill(title);
      }
      
      await this.search_btn.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async verifySearchResult() {
    await test.step('Verify Search Results', async () => {
      await expect(this.searchResultRow).toBeVisible({ timeout: 20000 });
      const rowCount = await this.page.locator('tbody tr').count();
      expect(rowCount).toBeGreaterThan(0);
    });
  }
}
