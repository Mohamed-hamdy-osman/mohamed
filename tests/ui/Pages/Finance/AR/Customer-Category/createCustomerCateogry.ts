import { expect, type Locator, type Page } from '@playwright/test';

export class CreateCustomerCategoryPage {

  readonly page: Page;

  // Main list page
  readonly createBtn: Locator;

  // Step 1 dialog - "Create Customer Category" chooser
  // (shown before any category is linked; offers Create Category / Link Category)
  readonly createCategoryBtn: Locator;
  readonly linkCategoryBtn: Locator;

  // Step 2 dialog - the actual Create Customer Category form
  readonly categoryNameInput: Locator;
  readonly descriptionTextarea: Locator;
  readonly receivableAccountSelect: Locator;
  readonly depositAccountSelect: Locator;
  readonly salesAccountSelect: Locator;
  readonly paymentTermSelect: Locator;
  readonly statusToggle: Locator;
  readonly saveBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.createBtn = page.getByRole('button', { name: 'Create' });

    // The two dialogs share the same title ("Create Customer Category"), so
    // we scope by the visible dialog and its distinguishing content instead
    // of relying on the dialog title text.
    const dialog = page.locator('.p-dialog:visible');

    this.createCategoryBtn = dialog.getByRole('button', { name: 'Create Category', exact: true });
    this.linkCategoryBtn = dialog.getByRole('button', { name: 'Link Category', exact: true });

    this.categoryNameInput = dialog.locator('#name');
    this.descriptionTextarea = dialog.getByPlaceholder('Enter Description');
    this.receivableAccountSelect = dialog.locator('#debitAccountId');
    this.depositAccountSelect = dialog.locator('#depositAccountId');
    this.salesAccountSelect = dialog.locator('#salesAccountId');
    this.paymentTermSelect = dialog.locator('#paymentTermId');
    this.statusToggle = dialog.locator('p-toggleswitch');
    this.saveBtn = dialog.getByRole('button', { name: 'Save', exact: true });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  // Select the first option of a p-select dropdown
  private async selectFirstOption(trigger: Locator) {
    await trigger.click();
    const overlay = this.page.locator('.p-select-overlay').last();
    const option = overlay.locator('.p-select-option').first();
    await option.waitFor({ state: 'visible' });
    await option.click();
    await overlay.waitFor({ state: 'hidden' });
  }

  // Type into a searchable p-select and pick the matching option
  private async selectOptionBySearch(trigger: Locator, searchText: string) {
    await trigger.click();
    const overlay = this.page.locator('.p-select-overlay').last();
    const searchInput = overlay.locator('input[role="searchbox"]');
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill(searchText);
    const option = overlay
      .locator('.p-select-option')
      .filter({ hasText: searchText })
      .first();
    await option.waitFor({ state: 'visible' });
    await option.click();
    await overlay.waitFor({ state: 'hidden' });
  }

  // Search the Chart of Accounts (COA) for the Receivable Account field and select the match
  async searchReceivableAccount(searchText: string) {
    await this.selectOptionBySearch(this.receivableAccountSelect, searchText);
  }

  // Search the Chart of Accounts (COA) for the Deposit Account field and select the match
  async searchDepositAccount(searchText: string) {
    await this.selectOptionBySearch(this.depositAccountSelect, searchText);
  }

  // Search the Chart of Accounts (COA) for the Sales Account field and select the match
  async searchSalesAccount(searchText: string) {
    await this.selectOptionBySearch(this.salesAccountSelect, searchText);
  }

  async createCustomerCategory(
    receivableAccountText = 'CIP',
    depositAccountText = 'Funds',
    salesAccountText = 'ERV'
  ) {

    const uniqueSuffix = Date.now().toString().slice(-8);

    // 1. Click on Create button
    await expect(this.createBtn).toBeEnabled();
    await this.createBtn.click();

    await this.waitForLoader();
    await this.page.locator('.p-dialog:visible').waitFor({ state: 'visible' });

    // 2 & 3. First dialog appears (no categories yet) - click "Create Category"
    await expect(this.createCategoryBtn).toBeEnabled();
    await this.createCategoryBtn.click();

    await this.waitForLoader();

    // 4. Second dialog (the actual Create Customer Category form) is displayed
    await this.categoryNameInput.waitFor({ state: 'visible' });

    // 5. Category Name - must be unique
    await this.categoryNameInput.fill(`Customer Category ${uniqueSuffix}`);

    // 6. Description
    await this.descriptionTextarea.fill(
      'Customer categories (also called User Groups) help you organize customers into groups for better management, reporting, and applying category-specific settings. This guide explains how to set up and use customer categories in EquiBillBook.'
    );

    // 7. Default Payment Term - select first index
    await this.selectFirstOption(this.paymentTermSelect);

    // Receivable Account is required by the form though not explicitly
    // listed in the steps - filled here so Save can become enabled.
    await this.searchReceivableAccount(receivableAccountText);

    // 8. Deposit Account - search and select
    await this.searchDepositAccount(depositAccountText);

    // 9. Sales Account - search and select
    await this.searchSalesAccount(salesAccountText);

    // 10. Check that Save is enabled, then click it
    await expect(this.saveBtn).toBeEnabled();
    await this.saveBtn.click();

    await this.page.locator('.p-dialog').last().waitFor({ state: 'hidden' });
    await this.waitForLoader();
  }

  // 11. Assertion that the Customer Category was created successfully
  async verifyCustomerCategoryCreated() {
    await expect(this.page).toHaveURL(/customer-category/);
    await expect(this.page.locator('.p-dialog')).toBeHidden();
    await expect(this.createBtn).toBeVisible();
  }
}