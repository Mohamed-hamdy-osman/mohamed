import { expect, type Locator, type Page } from '@playwright/test';

export class CreateSafesPage {

  readonly page: Page;
  readonly createBtn: Locator;
  readonly saveBtn: Locator;
  readonly accountPayable: Locator;
  readonly safeName: Locator;
  readonly safeCode: Locator;

  constructor(page: Page) {
    this.page = page;

    this.createBtn = page.getByRole('button', { name: 'Create' });
    this.saveBtn   = page.getByRole('button', { name: 'Save' });

    this.accountPayable = page.locator('#UseForAccountPayablecheckboxx');
    this.safeName       = page.getByPlaceholder('Enter Safes Name');
    this.safeCode       = page.getByPlaceholder('Enter Code');
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  private async selectOption(dropdown: Locator, optionIndex = 0) {
    await dropdown.click();
    const option = this.page.locator('.p-select-overlay .p-select-option').nth(optionIndex);
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  async createSafe() {

    const uniqueCode = Date.now().toString().slice(-6);

    // Click Create
    await expect(this.createBtn).toBeEnabled();
    await this.createBtn.click();

    await this.waitForLoader();

    // Wait for form to be ready
    await this.safeName.waitFor({ state: 'visible' });

    const corporateBranch = this.page.getByRole('combobox', { name: /corporate branch/i });
    const treasurer       = this.page.getByRole('combobox', { name: /treasurer/i });
    const safeAccount     = this.page.getByRole('combobox', { name: /safe account/i });
    const currency        = this.page.getByRole('combobox', { name: /currency/i });

    // Corporate Branch
    await this.selectOption(corporateBranch, 1);

    // Safe Name
    await this.safeName.fill('Corporate Safes');

    // Safe Code
    await this.safeCode.fill(uniqueCode);

    // Treasurer
    await treasurer.click();
    await this.page.getByPlaceholder('Search').fill('Super Admin');
    await this.page.locator('.p-select-overlay .p-select-option', { hasText: 'Super Admin' }).first().click();

    // Account Payable
    await this.accountPayable.check();

    // Safe Account
    await this.selectOption(safeAccount, 0);

    // Currency
    await currency.click();
    await this.page.getByPlaceholder('Search').fill('EGP');
    await this.page.locator('.p-select-overlay .p-select-option', { hasText: 'EGP' }).first().click();

    // Wait for currency overlay to fully close before saving
    await this.page.locator('.p-select-overlay').waitFor({ state: 'hidden' });

    // Save
    await expect(this.saveBtn).toBeEnabled();
    await this.saveBtn.click();

    await this.waitForLoader();

    // Verify dialog closed — safe was saved
    await this.page.locator('.p-dialog:has-text("Create Safes")').waitFor({ state: 'hidden', timeout: 10000 });
  }

}
