import { expect, type Locator, type Page } from '@playwright/test';

export class EditSafesPage {

  readonly page: Page;
  readonly editBtn: Locator;
  readonly saveBtn: Locator;
  readonly safeName: Locator;
  readonly safeCode: Locator;

  constructor(page: Page) {
    this.page = page;

    this.editBtn = page.locator('button:has(i.ki-notepad-edit)').first();

    this.saveBtn = page.getByRole('button', { name: 'Save' });

    this.safeName = page.getByPlaceholder('Enter Safes Name');
    this.safeCode = page.getByPlaceholder('Enter Code');
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  private async selectFromSearch(dropdown: Locator, searchText: string) {
    await dropdown.click();
    await this.page.getByPlaceholder('Search').fill(searchText);
    await this.page
      .locator('.p-select-overlay .p-select-option', { hasText: searchText })
      .first()
      .click();
    await this.page.locator('.p-select-overlay').waitFor({ state: 'hidden' });
  }

  async editSafe() {

    const uniqueCode = Date.now().toString().slice(-6);

    // Click Edit on first safe in list
    await expect(this.editBtn).toBeEnabled();
    await this.editBtn.click();

    await this.waitForLoader();

    // Wait for edit dialog to open
    await this.safeName.waitFor({ state: 'visible' });

    // Scope selectors to the visible dialog
    const dialog   = this.page.locator('.p-dialog:visible');
    // Currency may be empty — its aria-label is "Select Currency" which matches /currency/i
    const currency  = dialog.getByRole('combobox', { name: /currency/i });

    // Update Safe Code
    await this.safeCode.clear();
    await this.safeCode.fill(uniqueCode);

    // Select Currency from the list (required field — was empty)
    await this.selectFromSearch(currency, 'EGP');

    // Save
    await expect(this.saveBtn).toBeEnabled();
    await this.saveBtn.click();

    await this.waitForLoader();

    // Verify dialog closed — edit was saved
    await this.page
      .locator('.p-dialog:has-text("Edit Safes")')
      .waitFor({ state: 'hidden', timeout: 10000 });
  }

}
