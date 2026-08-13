import { Page, Locator, expect } from '@playwright/test';

export class CreateGroupsPage {
  readonly page: Page;

  // Tabs
  readonly groupsTab: Locator;

  // List page
  readonly createButton: Locator;

  // Create Group Dialog
  readonly createGroupDialog: Locator;
  readonly nameInput: Locator;
  readonly codeInput: Locator;
  readonly typesDropdown: Locator;
  readonly pickingRuleDropdown: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Groups tab
    this.groupsTab = page.getByRole('tab', {
      name: 'Groups',
      exact: true,
    });

    // Create button
    this.createButton = page.getByRole('button', {
      name: 'Create',
      exact: true,
    });

    // Create Group dialog
    this.createGroupDialog = page.getByRole('dialog');

    // Inputs
    this.nameInput = this.createGroupDialog.locator('#name');

    this.codeInput = this.createGroupDialog.locator('#code');

    // Dropdowns
    this.typesDropdown = this.createGroupDialog.getByRole(
      'combobox',
      { name: 'Types' }
    );

    this.pickingRuleDropdown = this.createGroupDialog.getByRole(
      'combobox',
      { name: 'Picking Rule' }
    );

    // Save
    this.saveButton = this.createGroupDialog.getByRole(
      'button',
      {
        name: 'Save',
        exact: true,
      }
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
   * Select Groups tab.
   */
  async selectGroupsTab() {
    await this.groupsTab.click();

    await expect(this.groupsTab).toHaveAttribute(
      'aria-selected',
      'true'
    );
  }

  /**
   * Click Create button and verify
   * Create Group dialog is displayed.
   */
  async clickCreate() {
    await this.createButton.click();

    await expect(this.createGroupDialog).toBeVisible();
  }

  async clickCreateButton() {
    await this.createButton.click();

    await expect(this.createGroupDialog).toBeVisible();
  }

  async fillGroupDetails(details: {
    name: string;
    code: string;
    types: string;
    pickingRule: string;
  }) {
    await this.nameInput.fill(details.name);
    await this.codeInput.fill(details.code);
    await this.selectFromDropdown(this.typesDropdown, details.types);
    await this.selectFromDropdown(this.pickingRuleDropdown, details.pickingRule);
  }

  /**
   * Select a value from a PrimeNG dropdown.
   */
  private async selectFromDropdown(
    dropdown: Locator,
    optionName: string
  ) {
    await dropdown.click();

    const option = this.page.getByRole(
      'option',
      {
        name: optionName,
        exact: true,
      }
    );

    await expect(option).toBeVisible();

    await option.click();
  }

  /**
   * Select Inventory from Types dropdown.
   */
  async selectInventoryType() {
    await this.selectFromDropdown(
      this.typesDropdown,
      'Inventory'
    );
  }

  /**
   * Select Group Picking Rule.
   */
  async selectGroupPickingRule() {
    await this.selectFromDropdown(
      this.pickingRuleDropdown,
      'Group Picking Rule'
    );
  }

  /**
   * Verify Save button is enabled and click it.
   */
  async saveGroup() {
    await expect(this.saveButton).toBeEnabled();

    await this.saveButton.click();

    await expect(this.createGroupDialog).toBeHidden();
  }

  /**
   * Complete Create Group flow.
   */
  async verifyGroupCreation(name: string) {
    const row = this.page.getByRole('row').filter({ hasText: name });
    await expect(row).toBeVisible();
  }

  async createInventoryGroup() {
    await this.selectGroupsTab();

    await this.clickCreate();

    await this.fillGroupDetails({
      name: `Inventory${String(Date.now()).slice(-4)}`,
      code: String(Date.now()).slice(-4),
      types: 'Inventory',
      pickingRule: 'Group Picking Rule',
    });

    await this.saveGroup();
  }
}