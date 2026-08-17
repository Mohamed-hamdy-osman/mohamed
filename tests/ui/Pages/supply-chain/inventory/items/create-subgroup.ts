import { Page, Locator, expect } from '@playwright/test';

export class CreateSubGroupsPage {
  readonly page: Page;

  // Tabs
  readonly subGroupsTab: Locator;

  // List page
  readonly createButton: Locator;

  // Create Sub Group Dialog
  readonly createSubGroupDialog: Locator;
  readonly nameInput: Locator;
  readonly codeInput: Locator;

  // Life Cycle
  readonly inventoryDropdown: Locator;
  readonly purchaseDropdown: Locator;

  // Group Configuration
  readonly groupDropdown: Locator;

  // Save
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Sub-Groups tab
    this.subGroupsTab = page.getByRole('tab', {
      name: 'Sub-Groups',
      exact: true,
    });

    // Create button
    this.createButton = page
      .getByRole('button', { name: 'Create' })
      .first();

    // Create Sub Group dialog
    this.createSubGroupDialog = page.getByRole('dialog', {
      name: 'Create Sub Group',
    });

    // Inputs
    this.nameInput = this.createSubGroupDialog.locator('#name');

    this.codeInput = this.createSubGroupDialog.locator('#code');

    // Life Cycle dropdowns
    this.inventoryDropdown = this.createSubGroupDialog.getByRole(
      'combobox',
      { name: 'Select Inventory' }
    );

    this.purchaseDropdown = this.createSubGroupDialog.getByRole(
      'combobox',
      { name: 'Select Purchase' }
    );

    // Group dropdown
    this.groupDropdown = this.createSubGroupDialog.getByRole(
      'combobox',
      { name: 'Select Group' }
    );

    // Save Changes button
    this.saveButton = this.createSubGroupDialog.getByRole(
      'button',
      { name: 'Save Changes', exact: true }
    );
  }

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

  /**
   * Select Sub-Groups tab.
   */
  async selectSubGroupsTab() {
    await this.subGroupsTab.click();

    await expect(this.subGroupsTab).toHaveAttribute(
      'aria-selected',
      'true'
    );
  }

  /**
   * Click Create button inside Sub-Groups section
   * and verify Create Sub Group dialog is displayed.
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

    await expect(this.createSubGroupDialog).toBeVisible();
  }

  /**
   * Fill Sub Group Name and Code.
   */
  async fillSubGroupDetails() {
    const uniqueId = String(Date.now()).slice(-3);

    await this.nameInput.fill(
      `Inv-Sub${uniqueId}`
    );

    await this.codeInput.fill(
      uniqueId
    );
  }

  /**
   * Select first option from Inventory dropdown.
   */
  async selectInventory() {
    await this.inventoryDropdown.click();

    const options = this.page.getByRole('option');

    await expect(options.first()).toBeVisible();

    await options.first().click();
  }

  /**
   * Select second option from Purchase dropdown.
   */
  async selectPurchase() {
    await this.purchaseDropdown.click();

    const options = this.page.getByRole('option');

    await expect(options.nth(1)).toBeVisible();

    await options.nth(1).click();
  }

  /**
   * Search for "Inv" in Group dropdown
   * and select the last matching result.
   * (Legacy helper — kept for backwards compatibility.)
   */
  async selectGroup() {
    await this.groupDropdown.click();

    const searchInput = this.page
      .locator('input')
      .filter({
        has: undefined,
      })
      .last();

    await searchInput.fill('Inv');

    const options = this.page.getByRole('option');

    const matchingOptions = options.filter({
      hasText: 'Inv',
    });

    await expect(matchingOptions.last()).toBeVisible();

    await matchingOptions.last().click();
  }

  /**
   * Select an exact Group option by name
   * (e.g. 'Inventory', 'Expenses', 'Assets').
   */
  async selectGroupByName(groupName: 'Inventory' | 'Expenses' | 'Assets') {
    await this.groupDropdown.click();

    const searchInput = this.page
      .locator('input')
      .filter({ has: undefined })
      .last();

    await searchInput.fill(groupName);

    const options = this.page.getByRole('option');

    const matchingOption = options
      .filter({ hasText: groupName })
      .first();

    await expect(matchingOption).toBeVisible();

    await matchingOption.click();
  }

  /**
   * Wait for the Inventory group's account fields to render:
   * Non-Asset, Inventory, Sales, COGS.
   */
  async waitForInventoryAccountFields() {
    const dialog = this.createSubGroupDialog;

    await expect(dialog.getByText('Non-Asset Account', { exact: true })).toBeVisible();
    await expect(dialog.getByText('Inventory Account', { exact: true })).toBeVisible();
    await expect(dialog.getByText('Sales Account', { exact: true })).toBeVisible();
    await expect(dialog.getByText('COGS Account', { exact: true })).toBeVisible();
  }

  /**
   * Wait for the Expenses group's account fields to render:
   * Expenses, Sales.
   */
  async waitForExpensesAccountFields() {
    const dialog = this.createSubGroupDialog;

    await expect(dialog.getByText('Expenses Account', { exact: true })).toBeVisible();
    await expect(dialog.getByText('Sales Account', { exact: true })).toBeVisible();
  }

  /**
   * Wait for the Assets group's account fields to render:
   * Asset, CIP, Depreciation, Accumulated Depreciation.
   */
  async waitForAssetsAccountFields() {
    const dialog = this.createSubGroupDialog;

    await expect(dialog.getByText('Asset Account', { exact: true })).toBeVisible();
    await expect(dialog.getByText('CIP Account', { exact: true })).toBeVisible();
    await expect(dialog.getByText('Depreciation Account', { exact: true })).toBeVisible();
    await expect(dialog.getByText('Accumulated Depreciation Account', { exact: true })).toBeVisible();
  }

  /**
   * Select first option for each account dropdown after Group is selected.
   * Covers all account fields regardless of which group is active.
   */
  async selectAccountFields() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 20000 });

    const dialog = this.page.locator('.p-dialog:visible');
    const unfilledDropdowns = dialog.getByText('Select Account', { exact: true });
    const count = await unfilledDropdowns.count();

    for (let i = 0; i < count; i++) {
      await unfilledDropdowns.first().click();

      const panel = this.page.locator('.p-select-overlay').last();
      await panel.waitFor({ state: 'visible', timeout: 10000 });

      await panel.locator('.p-select-option').first().click();
      await panel.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    }
  }

  /**
   * Verify Save Changes button is enabled
   * and click it.
   */
  async saveSubGroup() {
    await expect(this.saveButton).toBeEnabled();

    await this.saveButton.click();

    await expect(this.createSubGroupDialog).toBeHidden();
  }

  /**
   * Complete Create Sub Group flow for a given group type,
   * waiting for the group-specific account fields to render
   * before filling them in.
   */
  async createSubGroupForType(groupType: 'Inventory' | 'Expenses' | 'Assets') {
    await this.selectSubGroupsTab();

    await this.clickCreateButton();

    await this.fillSubGroupDetails();

    await this.selectGroupByName(groupType);

    switch (groupType) {
      case 'Inventory':
        await this.waitForInventoryAccountFields();
        break;
      case 'Expenses':
        await this.waitForExpensesAccountFields();
        break;
      case 'Assets':
        await this.waitForAssetsAccountFields();
        break;
    }

    await this.selectInventory();

    await this.selectPurchase();

    await this.selectAccountFields();

    await this.saveSubGroup();
  }
}