import { Page, Locator, expect } from '@playwright/test';

export class CreateItemsPage {
  readonly page: Page;

  // =========================
  // Items
  // =========================

  // Tabs
  readonly itemsTab: Locator;

  // List page
  readonly createButton: Locator;

  // Create Item Dialog
  readonly createItemDialog: Locator;
  readonly inventoryItemRadio: Locator;
  readonly newItemButton: Locator;

  // Item Details
  readonly itemNameInput: Locator;
  readonly codeInput: Locator;

  // Item Configuration
  readonly itemPickingRuleDropdown: Locator;
  readonly groupDropdown: Locator;
  readonly subGroupDropdown: Locator;
  readonly primaryUOMDropdown: Locator;

  // Save Item
  readonly saveButton: Locator;

  // Success toast
  readonly successToast: Locator;

  // =========================
  // Assign Item To Branch
  // =========================

  // Add Branch
  readonly addBranchButton: Locator;
  readonly createBranchDialog: Locator;

  // Branch Details
  readonly branchDropdown: Locator;
  readonly plannerDropdown: Locator;
  readonly taxDropdown: Locator;

  // Branch Tabs
  readonly attributesTab: Locator;
  readonly accountsTab: Locator;
  readonly vendorsTab: Locator;
  readonly controlTab: Locator;
  readonly storesTab: Locator;

  // Vendors
  readonly vendorDropdown: Locator;

  // Control
  readonly lotControlCheckbox: Locator;
  readonly serialControlCheckbox: Locator;
  readonly expirationCheckbox: Locator;

  // Stores
  readonly storeDropdown: Locator;
  readonly addButton: Locator;

  // Save Branch
  readonly branchSaveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // =====================================================
    // Items
    // =====================================================

    // Items tab
    this.itemsTab = page.getByRole('tab', {
      name: 'Items',
      exact: true,
    });

    // Create button
    this.createButton = page
      .getByRole('button', { name: 'Create' })
      .first();

    // Create Item dialog
    this.createItemDialog = page.getByRole('dialog', {
      name: 'Create Item',
    });

    // Inventory Item radio
    this.inventoryItemRadio =
      this.createItemDialog.getByRole('radio', {
        name: 'Inventory Item',
        exact: true,
      });

    // New Item button
    this.newItemButton =
      this.createItemDialog.getByRole('button', {
        name: 'New Item',
        exact: true,
      });

    // Item Name
    this.itemNameInput = this.page
      .getByRole('textbox', {
        name: /Item Name/i,
      })
      .last();

    // Code
    this.codeInput = this.page.getByRole('textbox', {
      name: /^Code$/i,
    });

    // Item Picking Rule
    this.itemPickingRuleDropdown =
      this.page.getByRole('combobox', {
        name: 'Select Item Picking Rule',
      });

    // Group
    this.groupDropdown =
      this.page.getByRole('combobox', {
        name: 'Select Group',
      });

    // Sub Group
    this.subGroupDropdown =
      this.page.getByRole('combobox', {
        name: 'Select Sup-Group',
      });

    // Primary UOM
    this.primaryUOMDropdown =
      this.page.getByRole('combobox', {
        name: 'Primary UOM',
      });

    // Save Item (page-level Save button, outside any dialog)
    this.saveButton = this.page
      .locator('#kt_app_content_container')
      .getByRole('button', { name: 'Save' });

    // Success toast notification
    this.successToast = this.page.locator(
      '.p-toast-message-success, [class*="toast"][class*="success"], .alert-success'
    );

    // =====================================================
    // Assign Item To Branch
    // =====================================================

    // Add Branch
    this.addBranchButton = this.page.getByRole('button', {
      name: 'Add Branch',
    });

    // Create Branch dialog
    this.createBranchDialog = this.page.getByRole('dialog', {
      name: 'Create Branch',
    });

    // Branch
    this.branchDropdown =
      this.createBranchDialog.getByRole('combobox', {
        name: 'Select Branch',
      });

    // Planner
    this.plannerDropdown =
      this.createBranchDialog.getByRole('combobox', {
        name: 'Select Planner',
      });

    // Tax
    this.taxDropdown =
      this.createBranchDialog.getByRole('combobox', {
        name: 'Select Tax',
      });

    // Attributes tab
    this.attributesTab =
      this.createBranchDialog.getByRole('tab', {
        name: 'Attributes',
        exact: true,
      });

    // Accounts tab
    this.accountsTab =
      this.createBranchDialog.getByRole('tab', {
        name: 'Accounts',
        exact: true,
      });

    // Vendors tab
    this.vendorsTab =
      this.createBranchDialog.getByRole('tab', {
        name: 'Vendors',
        exact: true,
      });

    // Vendor dropdown
    this.vendorDropdown =
      this.createBranchDialog.getByRole('combobox', {
        name: 'Select Vendor',
      });

    // Control tab
    this.controlTab =
      this.createBranchDialog.getByRole('tab', {
        name: 'Control',
        exact: true,
      });

    // Stores tab
    this.storesTab =
      this.createBranchDialog.getByRole('tab', {
        name: 'Stores',
        exact: true,
      });

    // Lot Control checkbox (PrimeNG — target the clickable div)
    this.lotControlCheckbox = this.createBranchDialog
      .locator('p-checkbox[formcontrolname="isLotControl"]')
      .locator('div.p-checkbox');

    // Serial Control checkbox
    this.serialControlCheckbox = this.createBranchDialog
      .locator('p-checkbox[formcontrolname="isSerialControl"]')
      .locator('div.p-checkbox');

    // Expiration checkbox
    this.expirationCheckbox = this.createBranchDialog
      .locator('p-checkbox[formcontrolname="isExpirationControl"]')
      .locator('div.p-checkbox');

    // Store
    this.storeDropdown =
      this.createBranchDialog.getByRole('combobox', {
        name: 'Select Store',
      });

    // Add button
    this.addButton =
      this.createBranchDialog.getByRole('button', {
        name: 'Add',
        exact: true,
      });

    // Save Branch
    this.branchSaveButton =
      this.createBranchDialog.getByRole('button', {
        name: 'Save',
        exact: true,
      });
  }

  // =====================================================
  // Navigate
  // =====================================================

  /**
   * Navigate directly to Items page.
   */
  async goto() {
    await this.page.goto('/zeta/inventory/items');

    await this.page.waitForLoadState('load');

    await expect(this.page).toHaveURL(
      /inventory\/items/
    );
  }

  // =====================================================
  // Items
  // =====================================================

  /**
   * Select Items tab.
   */
  async selectItemsTab() {
    await this.itemsTab.click();

    await expect(this.itemsTab).toHaveAttribute(
      'aria-selected',
      'true'
    );
  }

  /**
   * Click Create button
   * and verify Create Item dialog is displayed.
   */
  async clickCreateButton() {
    await this.page
      .locator('.loader-wrapper')
      .waitFor({
        state: 'hidden',
        timeout: 20000,
      });

    await expect(this.createButton).toBeVisible({
      timeout: 20000,
    });

    await this.createButton.click();

    await expect(this.createItemDialog).toBeVisible();
  }

  /**
   * Select Inventory Item.
   */
  async selectInventoryItem() {
    await this.inventoryItemRadio.check();

    await expect(
      this.inventoryItemRadio
    ).toBeChecked();
  }

  /**
   * Click New Item button.
   */
  async clickNewItem() {
    await expect(this.newItemButton).toBeEnabled({
      timeout: 10000,
    });

    await this.newItemButton.click();
  }

  /**
   * Fill Item Name and Code.
   *
   * Item Name:
   * INV + unique 3 digits
   *
   * Code:
   * unique 3 digits
   */
  async fillItemDetails() {
    const uniqueId = String(Date.now()).slice(-5);

    await this.itemNameInput.fill(
      `INV${uniqueId}`
    );

    await this.codeInput.fill(
      uniqueId
    );
  }

  /**
   * Select last option from Item Picking Rule dropdown.
   */
  async selectItemPickingRule() {
    await this.itemPickingRuleDropdown.click();

    const overlay =
      this.page
        .locator('.p-select-overlay')
        .last();

    await expect(overlay).toBeVisible({
      timeout: 10000,
    });

    const searchInput =
      overlay.locator('.p-select-filter');

    await searchInput.fill('Picking');

    const options =
      overlay.locator('li.p-select-option');

    await expect(options.first()).toBeVisible({
      timeout: 10000,
    });

    await this.page.waitForTimeout(300);

    await options.last().click();
  }

  /**
   * Select last option from Group dropdown.
   */
  async selectGroup() {
    await this.groupDropdown.click();

    const panelId =
      await this.groupDropdown.getAttribute(
        'aria-controls'
      );

    const listbox =
      this.page.locator(`#${panelId}`);

    const options =
      listbox.getByRole('option');

    await expect(options.first()).toBeVisible({
      timeout: 10000,
    });

    await options.last().click();
  }

  /**
   * Select last option from Sub Group dropdown.
   *
   * Search for INV.
   */
  async selectSubGroup() {
    await this.subGroupDropdown.click();

    const overlay =
      this.page
        .locator('.p-select-overlay')
        .last();

    await expect(overlay).toBeVisible({
      timeout: 15000,
    });

    const searchInput =
      overlay.locator('.p-select-filter');

    await searchInput.fill('INV');

    const options =
      overlay.locator('li.p-select-option');

    await expect(options.first()).toBeVisible({
      timeout: 10000,
    });

    await this.page.waitForTimeout(300);

    await options.last().click();
  }

  /**
   * Search for "كيلو"
   * and select the first matching option.
   */
  async selectPrimaryUOM() {
    await this.primaryUOMDropdown.click();

    const panelId =
      await this.primaryUOMDropdown.getAttribute(
        'aria-controls'
      );

    const listbox =
      this.page.locator(`#${panelId}`);

    const searchInput =
      this.page.locator(
        'input[type="text"]'
      ).last();

    await searchInput.fill('كيلو');

    const matchingOption =
      listbox
        .getByRole('option')
        .filter({
          hasText: 'كيلو',
        })
        .first();

    await expect(
      matchingOption
    ).toBeVisible({
      timeout: 10000,
    });

    await matchingOption.click();
  }

  /**
   * Verify Save button is enabled
   * and click it.
   */
  async saveItem() {
    await expect(this.saveButton).toBeEnabled({
      timeout: 10000,
    });

    await this.saveButton.click();

    await this.page
      .locator('.loader-wrapper')
      .waitFor({ state: 'hidden', timeout: 20000 });

    await this.page.waitForURL(/edit-item/, {
      timeout: 20000,
    });

    await expect(this.itemNameInput).not.toHaveValue(
      '',
      { timeout: 20000 }
    );

    await expect(this.page).toHaveURL(/edit-item/);
  }

  // =====================================================
  // Assign Item To Branch
  // =====================================================

  /**
   * Click Add Branch
   * and verify Create Branch dialog.
   */
  async clickAddBranch() {
    await this.page
      .locator('.loader-wrapper')
      .waitFor({ state: 'hidden', timeout: 20000 });

    await expect(
      this.addBranchButton
    ).toBeVisible({
      timeout: 15000,
    });

    await this.addBranchButton.click();

    await expect(
      this.createBranchDialog
    ).toBeVisible({
      timeout: 20000,
    });
  }

  /**
   * Search for Cairo
   * and select first option.
   */
  async selectBranch() {
    await this.branchDropdown.click();

    const overlay =
      this.page
        .locator('.p-select-overlay')
        .last();

    await expect(overlay).toBeVisible({
      timeout: 10000,
    });

    const searchInput =
      overlay.getByRole('searchbox');

    await searchInput.fill('Cairo');

    const options =
      overlay.locator('li.p-select-option');

    await expect(options.first()).toBeVisible({
      timeout: 10000,
    });

    await options.first().click({ force: true });

    await expect(overlay).not.toBeVisible({
      timeout: 5000,
    });
  }

  /**
   * Select first Planner.
   */
  async selectPlanner() {
    await this.plannerDropdown.click();

    const overlay =
      this.page
        .locator('.p-select-overlay')
        .last();

    await expect(overlay).toBeVisible({
      timeout: 10000,
    });

    const options =
      overlay.locator('li.p-select-option');

    await expect(options.first()).toBeVisible({
      timeout: 10000,
    });

    await options.first().click();
  }

  /**
   * Select first Tax.
   */
  async selectTax() {
    await this.taxDropdown.click();

    const overlay =
      this.page
        .locator('.p-select-overlay')
        .last();

    await expect(overlay).toBeVisible({
      timeout: 10000,
    });

    const options =
      overlay.locator('li.p-select-option');

    await expect(options.first()).toBeVisible({
      timeout: 10000,
    });

    await options.first().click();

    await expect(overlay).not.toBeVisible({
      timeout: 5000,
    });
  }

  // =====================================================
  // Attributes
  // =====================================================

  async selectAttributesTab() {
    await this.attributesTab.click();

    await expect(
      this.attributesTab
    ).toHaveAttribute('aria-selected', 'true');
  }

  // =====================================================
  // Accounts
  // =====================================================

  async selectAccountsTab() {
    await this.accountsTab.click();

    await expect(
      this.accountsTab
    ).toHaveAttribute('aria-selected', 'true');
  }

  // =====================================================
  // Vendors
  // =====================================================

  /**
   * Select Vendors tab.
   */
  async selectVendorsTab() {
    await expect(
      this.createBranchDialog
    ).toBeVisible({ timeout: 10000 });

    await this.vendorsTab.click();

    await expect(
      this.vendorsTab
    ).toHaveAttribute(
      'aria-selected',
      'true'
    );
  }

  /**
   * Select first vendor from the dropdown
   * and click Add.
   */
  async selectVendor() {
    await this.vendorDropdown.click();

    const overlay =
      this.page
        .locator('.p-select-overlay')
        .last();

    await expect(overlay).toBeVisible({
      timeout: 10000,
    });

    const options =
      overlay.locator('li.p-select-option');

    await expect(options.first()).toBeVisible({
      timeout: 10000,
    });

    await options.nth(1).click();

    await expect(
      this.addButton
    ).toBeEnabled({ timeout: 10000 });

    await this.addButton.click();

    await this.page
      .locator('.loader-wrapper')
      .waitFor({ state: 'hidden', timeout: 20000 });
  }

  // =====================================================
  // Control
  // =====================================================

  /**
   * Select Control tab.
   */
  async selectControlTab() {
    await this.controlTab.click();

    await expect(
      this.controlTab
    ).toHaveAttribute(
      'aria-selected',
      'true'
    );

    await expect(
      this.createBranchDialog
    ).toBeVisible({ timeout: 5000 });
  }

  /**
   * Uncheck Lot Control
   * and Serial Control.
   */
  async uncheckControlOptions() {
    await expect(
      this.createBranchDialog
    ).toBeVisible({ timeout: 10000 });

    if (
      (await this.lotControlCheckbox.getAttribute(
        'data-p-checked'
      )) === 'true'
    ) {
      await this.lotControlCheckbox.click();
    }

    if (
      (await this.serialControlCheckbox.getAttribute(
        'data-p-checked'
      )) === 'true'
    ) {
      await this.serialControlCheckbox.click();
    }

    const expirationCount =
      await this.expirationCheckbox.count();

    if (expirationCount > 0) {
      if (
        (await this.expirationCheckbox.getAttribute(
          'data-p-checked'
        )) === 'true'
      ) {
        await this.expirationCheckbox.click();
      }

      await expect(
        this.expirationCheckbox
      ).toHaveAttribute('data-p-checked', 'false');
    }

    await expect(
      this.lotControlCheckbox
    ).toHaveAttribute('data-p-checked', 'false');

    await expect(
      this.serialControlCheckbox
    ).toHaveAttribute('data-p-checked', 'false');
  }

  // =====================================================
  // Stores
  // =====================================================

  /**
   * Select Stores tab.
   */
  async selectStoresTab() {
    await this.storesTab.click();

    await expect(
      this.storesTab
    ).toHaveAttribute(
      'aria-selected',
      'true'
    );
  }

  /**
   * Select first Store.
   */
  async selectStore() {
    await this.storeDropdown.click();

    const overlay =
      this.page
        .locator('.p-select-overlay')
        .last();

    await expect(overlay).toBeVisible({
      timeout: 10000,
    });

    const options = overlay.locator(
      'li.p-select-option, li[role="option"]'
    );

    await expect(options.first()).toBeVisible({
      timeout: 10000,
    });

    await options.last().click();
  }

  /**
   * Click Add button.
   */
  async clickAdd() {
    await expect(
      this.addButton
    ).toBeEnabled({
      timeout: 10000,
    });

    await this.addButton.click();
  }

  /**
   * Select second Store
   * from the same list
   * and click Add.
   */
  async selectSecondStoreAndAdd() {
    await this.storeDropdown.click();

    const overlay =
      this.page
        .locator('.p-select-overlay')
        .last();

    await expect(overlay).toBeVisible({
      timeout: 10000,
    });

    const options =
      overlay.locator('li.p-select-option');

    await expect(
      options.nth(1)
    ).toBeVisible({
      timeout: 10000,
    });

    await options.nth(1).click();

    await this.addButton.click();
  }

  /**
   * Select third Store
   * from the same list.
   */
  async selectThirdStore() {
    await this.storeDropdown.click();

    const overlay =
      this.page
        .locator('.p-select-overlay')
        .last();

    await expect(overlay).toBeVisible({
      timeout: 10000,
    });

    const options =
      overlay.locator('li.p-select-option');

    await expect(
      options.nth(2)
    ).toBeVisible({
      timeout: 10000,
    });

    await options.nth(2).click();
  }

  // =====================================================
  // Save Branch
  // =====================================================

  /**
   * Verify Branch Save button is enabled
   * and click it.
   */
  async saveBranch() {
    await expect(
      this.branchSaveButton
    ).toBeEnabled({
      timeout: 20000,
    });

    await this.branchSaveButton.click();

    await expect(
      this.createBranchDialog
    ).not.toBeVisible({ timeout: 20000 });
  }

  // =====================================================
  // Complete Flow
  // =====================================================

  /**
   * Complete Create Inventory Item flow
   * including Assign Item To Branch.
   */
  async createInventoryItem() {

    // -------------------------
    // Step 1: Fill header data
    // -------------------------

    await this.selectItemsTab();

    await this.clickCreateButton();

    await this.selectInventoryItem();

    await this.clickNewItem();

    await this.fillItemDetails();

    await this.selectItemPickingRule();

    await this.selectGroup();

    await this.selectSubGroup();

    await this.selectPrimaryUOM();

    // -------------------------
    // Step 2: Save item page
    // -------------------------

    await this.saveItem();

    // -------------------------
    // Step 3: Click Add Branch
    // -------------------------

    await this.clickAddBranch();

    // -------------------------
    // Step 4: Branch + Planner
    // -------------------------

    await this.selectBranch();

    await this.selectPlanner();

    // -------------------------
    // Step 5: Attributes tab
    // -------------------------

    await this.selectAttributesTab();

    await this.selectTax();

    // -------------------------
    // Step 6: Accounts tab
    // -------------------------

    await this.selectAccountsTab();

    // -------------------------
    // Step 7: Vendors tab
    // -------------------------

    await this.selectVendorsTab();

    await this.selectVendor();

    // -------------------------
    // Step 8: Control tab
    // -------------------------

    await this.selectControlTab();

    await this.uncheckControlOptions();

    // -------------------------
    // Step 9: Stores tab
    // -------------------------

    await this.selectStoresTab();

    await this.selectStore();

    await this.clickAdd();

    // -------------------------
    // Step 10: Save popup
    // -------------------------

    await this.saveBranch();

    // -------------------------
    // Step 11: Save item page
    // -------------------------

    await this.page
      .locator('.loader-wrapper')
      .waitFor({ state: 'hidden', timeout: 20000 });

    await expect(this.saveButton).toBeEnabled({
      timeout: 15000,
    });

    await this.saveButton.click();

    await this.page
      .locator('.loader-wrapper')
      .waitFor({ state: 'hidden', timeout: 20000 });

    await expect(this.page).toHaveURL(/edit-item/, {
      timeout: 15000,
    });

    await expect(this.itemNameInput).not.toHaveValue(
      '',
      { timeout: 15000 }
    );

    await expect(
      this.addBranchButton
    ).toBeVisible({ timeout: 10000 });
  }
}