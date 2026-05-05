import { expect, type Locator, type Page } from '@playwright/test';

export class ManageAssignedBranchesPage {

  readonly page: Page;

  readonly supplyChain_btn: Locator;
  readonly inventory_btn: Locator;
  readonly settings_menu: Locator;
  readonly assignedBranches_menu: Locator;
  readonly create_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.supplyChain_btn = page.getByText('Supply Chain');
    this.inventory_btn = page.getByText('Inventory');
    this.settings_menu = page.getByText('Settings');

    this.assignedBranches_menu = page.getByRole('link', {
      name: 'Assigned Branches',
      exact: true
    });

    this.create_btn = page.getByRole('button', { name: 'Create' });
  }

  async navigateToAssignedBranches() {

    await this.supplyChain_btn.click();
    await this.inventory_btn.click();

    await this.settings_menu.waitFor({ state: 'visible' });
    await this.settings_menu.click();

    await Promise.all([
      this.page.waitForURL(/organization/),
      this.assignedBranches_menu.click()
    ]);
  }

  async verifyNavigationToAssignedBranches() {

    await expect(this.page).toHaveURL(/organization/);
    await expect(this.create_btn).toBeVisible();
  }
}