import { Page, Locator, expect } from '@playwright/test';

export class CreateSalesOrderPage {
  readonly page: Page;

  // List page
  readonly createButton: Locator;

  // Create form
  readonly orderTypeNameDropdown: Locator;
  readonly customerCodeDropdown: Locator;
  readonly addressNameDropdown: Locator;
  readonly addLineButton: Locator;
  readonly submitButton: Locator;

  // Add Line dialog
  readonly addLineDialog: Locator;
  readonly itemNameDropdown: Locator;
  readonly uomDropdown: Locator;
  readonly quantityInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // List page
    this.createButton = page.getByRole('button', {
      name: 'Create',
    });

    // Create form
    this.orderTypeNameDropdown = page.locator('#orderTypeName');
    this.customerCodeDropdown = page.locator('#customerCode');
    this.addressNameDropdown = page.locator('#addressName');

    this.addLineButton = page.getByRole('button', {
      name: 'Add Line',
    });

    this.submitButton = page.getByRole('button', {
      name: 'Submit',
      exact: true,
    });

    // Add Line dialog
    this.addLineDialog = page.getByRole('dialog', {
      name: 'Add Line',
    });

    this.itemNameDropdown = this.addLineDialog.locator('#itemName');
    this.uomDropdown = this.addLineDialog.locator('#uom');
    this.quantityInput = this.addLineDialog.locator('#quantity input');

    this.saveButton = this.addLineDialog.getByRole('button', {
      name: 'Save',
      exact: true,
    });
  }

  get successToast() {
    return this.page.locator('.p-toast-message-success');
  }

  /**
   * Generic helper for PrimeNG dropdowns.
   * Opens the dropdown, optionally filters,
   * then selects the required option.
   */
  private async selectFromDropdown(
    dropdown: Locator,
    filterText?: string,
    exactOptionName?: string,
  ) {
    await dropdown.click();

    if (filterText) {
      const filterInput = this.page
        .locator('input[type="text"]')
        .last();

      if (await filterInput.isVisible().catch(() => false)) {
        await filterInput.fill(filterText);
      }
    }

    const option = exactOptionName
      ? this.page.getByRole('option', {
          name: exactOptionName,
          exact: true,
        })
      : this.page
          .locator('[role="listbox"] [role="option"]')
          .first();

    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  async clickCreate() {
    await this.createButton.click();

    await expect(this.page).toHaveURL(
      /sales-orders\/add/,
    );
  }

  async selectOrderType(name: string) {
    await this.selectFromDropdown(
      this.orderTypeNameDropdown,
      name,
      name,
    );
  }

  async selectCustomerCode(code: string) {
    await this.selectFromDropdown(
      this.customerCodeDropdown,
      code,
      code,
    );
  }

  async selectFirstAddress() {
    await this.selectFromDropdown(
      this.addressNameDropdown,
    );
  }

  async clickAddLine() {
    await this.addLineButton.click();

    await expect(this.addLineDialog).toBeVisible();
  }

  async fillAddLineDialog(quantity: string) {
    await this.selectFromDropdown(
      this.itemNameDropdown,
    );

    await this.selectFromDropdown(
      this.uomDropdown,
    );

    await this.quantityInput.fill(quantity);
  }

  async saveLine() {
    await this.saveButton.click();

    await expect(this.addLineDialog).toBeHidden();
  }

  async submit() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
    await expect(this.submitButton).toBeVisible();
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
    await expect(this.successToast).toBeVisible({ timeout: 15000 });
    await expect(this.page).toHaveURL(/sales-orders/);
  }

  async createOrder(
    options: {
      orderType?: string;
      customerCode?: string;
      quantity?: string;
    } = {},
  ) {
    const {
      orderType = 'Auto Transact',
      customerCode = '1',
      quantity = '1',
    } = options;

    await this.clickCreate();

    await this.selectOrderType(orderType);

    await this.selectCustomerCode(customerCode);

    await this.selectFirstAddress();

    await this.clickAddLine();

    await this.fillAddLineDialog(quantity);

    await this.saveLine();

    await this.submit();
  }
}